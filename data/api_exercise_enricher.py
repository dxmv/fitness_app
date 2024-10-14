import requests
import json
from pytube import Search
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ExerciseDB API configuration
EXERCISEDB_API_KEY = os.getenv('EXERCISEDB_API_KEY')
EXERCISEDB_API_HOST = 'exercisedb.p.rapidapi.com'
EXERCISEDB_API_URL = 'https://exercisedb.p.rapidapi.com/exercises'


# Filtering criteria
COMMON_EQUIPMENT = ['body weight', 'dumbbell', 'barbell', 'cable', 'kettlebell', 'resistance band']
MAJOR_MUSCLE_GROUPS = ['chest', 'back', 'shoulders', 'legs', 'arms', 'core']
COMMON_EXERCISES = [
    'push-up', 'pull-up', 'squat', 'deadlift', 'bench press', 'shoulder press',
    'lunge', 'plank', 'bicep curl', 'tricep extension', 'leg press', 'row',
    'crunch', 'burpee', 'mountain climber', 'jump rope', 'dip'
]

# Where we want to save the json file
SAVE_DIRECTORY = r"D:\ReactNativeProjekti\FitnessApp\server\src\main\resources"
SAVE_PATH = os.path.join(SAVE_DIRECTORY, 'exercises.json')


# get all the exercises from the api (1324)
def fetch_exercises():
    headers = {
        'x-rapidapi-key': EXERCISEDB_API_KEY,
        'x-rapidapi-host': EXERCISEDB_API_HOST
    }
    response = requests.get(f"{EXERCISEDB_API_URL}?limit=1500&offset=0", headers=headers)
    return response.json()


# we don't need all exercises so we filter them
def filter_exercises(exercises):
    filtered = []
    for exercise in exercises:

        if (exercise['equipment'].lower() in COMMON_EQUIPMENT and
                exercise['target'].lower() in MAJOR_MUSCLE_GROUPS):
            filtered.append(exercise)
        elif any(common.lower() in exercise['name'].lower() for common in COMMON_EXERCISES):
            filtered.append(exercise)
    return filtered[:100]  # Limit to top 100 exercises


# modify all of the exercises to match the database models
def match_model(exercises):
    # group the instructions in to the description
    def group_instructions(new_exercise, previous):
        new_exercise["description"] = "Instructions:\n"
        for i, instruction in enumerate(previous["instructions"]):
            new_exercise["description"] += f"{i+1}. {instruction}\n"

    modified_exercises = []
    for e in exercises:
        new_exercise = {
            "id": e["id"],
            "gifUrl":e["gifUrl"]
        }
        # capitalise the name
        new_exercise["name"] = e["name"].capitalize()
        # add all muscle groups
        new_exercise["muscleGroups"] = [muscle.capitalize() for muscle in e["secondaryMuscles"]]
        new_exercise["muscleGroups"].append(e["target"].capitalize())

        group_instructions(new_exercise, e)
        modified_exercises.append(new_exercise)

    return modified_exercises


def search_youtube_videos(exercise_name, max_results=4):
    search = Search(exercise_name)

    # Extract the first few results (up to max_results)
    videos = search.results[:max_results]

    # Create a list of video details (title and URL)
    return [
        {
            'title': video.title,  # Get the video title
            'videoUrl': video.watch_url,  # Get the video URL
            'id':video.video_id
        }
        for video in videos
    ]

# add youtube video ids to the exercises
def add_videos(exercises):
    for exercise in exercises:
        # search youtube and add objects to the item
        videos = search_youtube_videos(exercise['name'])
        exercise["videos"] = videos


def main():
    exercises = []
    print("Checking for cached exercises...")
    # all exercises from the api are stored in exercises.json
    if os.path.exists('exercises.json'):
        print("Loading exercises from cache...")
        with open('exercises.json', 'r') as f:
            exercises = json.load(f)
    else:
        # get all exercises
        print("Fetching exercises from API...")
        exercises = fetch_exercises()
        print(f"Fetched {len(exercises)} exercises.")

        # write them to the json
        print("Caching exercises...")
        with open('exercises.json', 'w') as f:
            json.dump(exercises, f, indent=2)

    # filter the exercises
    filtered = filter_exercises(exercises)

    # modify the data to match the database
    print("Filtering videos...")
    matched = match_model(filtered)

    # add the youtube video fields
    print("Adding videos to the exercises...")
    add_videos(matched)

    # Ensure the save directory exists
    os.makedirs(SAVE_DIRECTORY, exist_ok=True)

    # write to the file
    print(f"Saving enriched exercises to JSON file: {SAVE_PATH}")
    with open(SAVE_PATH, 'w') as f:
        json.dump(matched, f, indent=2)

    print(f"Done! Enriched exercises saved to '{SAVE_PATH}'")


if __name__ == "__main__":
    main()
