import requests
import json
from googleapiclient.discovery import build
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ExerciseDB API configuration
EXERCISEDB_API_KEY = os.getenv('EXERCISEDB_API_KEY')
EXERCISEDB_API_HOST = 'exercisedb.p.rapidapi.com'
EXERCISEDB_API_URL = 'https://exercisedb.p.rapidapi.com/exercises'

# YouTube API configuration
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# Filtering criteria
COMMON_EQUIPMENT = ['body weight', 'dumbbell', 'barbell', 'cable', 'kettlebell', 'resistance band']
MAJOR_MUSCLE_GROUPS = ['chest', 'back', 'shoulders', 'legs', 'arms', 'core']
COMMON_EXERCISES = [
    'push-up', 'pull-up', 'squat', 'deadlift', 'bench press', 'shoulder press',
    'lunge', 'plank', 'bicep curl', 'tricep extension', 'leg press', 'row',
    'crunch', 'burpee', 'mountain climber', 'jump rope', 'dip'
]


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


def search_youtube_videos(exercise_name, max_results=3):
    search_response = youtube.search().list(
        q=f"{exercise_name} exercise tutorial",
        type='video',
        part='id,snippet',
        maxResults=max_results
    ).execute()

    videos = []
    for item in search_response['items']:
        video = {
            'title': item['snippet']['title'],
            'videoUrl': f"https://www.youtube.com/watch?v={item['id']['videoId']}"
        }
        videos.append(video)

    return videos


def enrich_exercises(exercises):
    enriched_exercises = []
    for exercise in exercises:
        videos = search_youtube_videos(exercise['name'])
        enriched_exercise = {
            'name': exercise['name'],
            'description': exercise.get('instructions', []),
            'bodyPart': exercise['bodyPart'],
            'equipment': exercise['equipment'],
            'gifUrl': exercise['gifUrl'],
            'target': exercise['target'],
            'secondaryMuscles': exercise.get('secondaryMuscles', []),
            'videoUrls': videos
        }
        enriched_exercises.append(enriched_exercise)
    return enriched_exercises


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
    print(filtered)

    # modify the data to match the database

    # add the youtube video fields

    # write to the file


if __name__ == "__main__":
    main()
