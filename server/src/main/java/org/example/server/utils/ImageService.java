package org.example.server.utils;

import org.example.server.exceptions.http.InternalServerException;
import org.example.server.exceptions.http.NotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {
    private String baseUrl = "http://localhost:8080";

    private final String uploadDir = "src/main/resources/static/uploads/"; // the images will be saved here


    /**
     * This function uploads an image file to a specified path on the server.
     * It generates a unique filename for the image, ensures the necessary directories
     * are created, and then writes the file to the designated location. If successful,
     * it returns the URL where the uploaded image can be accessed. If an error occurs
     * during the process, an InternalServerException is thrown.
     *
     * @param path  The relative path where the image should be uploaded.
     * @param file  The MultipartFile object representing the image to be uploaded.
     * @return      The URL where the uploaded image can be accessed.
     * @throws      InternalServerException if an error occurs during the upload.
     */
    public String uploadImage(String path, MultipartFile file) {
        try {
            // Generates a unique filename by combining a UUID with the original file name
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // Creates the full path where the file will be saved, combining the upload directory, provided path, and file name
            Path filePath = Paths.get(uploadDir + path + fileName);

            // Ensures that the directory structure for the file path exists, creating it if necessary
            Files.createDirectories(filePath.getParent());

            // Writes the file data to the specified path
            Files.write(filePath, file.getBytes());

            // Returns the URL where the uploaded file can be accessed
            return baseUrl + "/uploads/" + path + fileName;
        } catch (IOException e) {
            // Throws a custom exception if an error occurs during the file upload process
            throw new InternalServerException("Error while uploading an image");
        }
    }

    /**
     * Deletes an image file from the server.
     *
     * @param imagePath The relative path of the image to be deleted.
     * @throws InternalServerException if an error occurs during deletion.
     * @throws NotFoundException if the image file does not exist.
     */
    public void deleteImage(String imagePath) {
        Path filePath = Paths.get(uploadDir + imagePath);
        try {
            if (!Files.exists(filePath)) {
                throw new NotFoundException("Image not found: " + imagePath);
            }
            Files.delete(filePath);
        } catch (IOException e) {
            throw new InternalServerException("Error while deleting the image: " + imagePath);
        }
    }

    /**
     * Retrieves an image file as a Resource.
     *
     * @param imagePath The relative path of the image to be retrieved.
     * @return Resource object representing the image file.
     * @throws NotFoundException if the image file does not exist or cannot be read.
     */
    public Resource getImage(String imagePath) {
        try {
            Path filePath = Paths.get(uploadDir + imagePath);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new NotFoundException("Image not found: " + imagePath);
            }
        } catch (MalformedURLException e) {
            throw new NotFoundException("Image not found: " + imagePath);
        }
    }

}
