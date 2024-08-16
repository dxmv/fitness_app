package org.example.server.controllers;

import org.example.server.utils.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/uploads")
public class ImageController {

    @Autowired
    private ImageService imageService;
    /**
     * Retrieves an image
     *
     * @param main_path the path of the file
     * @param filename The name of the image file to retrieve.
     * @return A ResponseEntity containing the image resource.
     */

    @GetMapping("/{main_path}/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename, @PathVariable String main_path) {
        Resource file = imageService.getImage(main_path + "/" + filename);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(MediaType.IMAGE_PNG_VALUE))
                .body(file);
    }
}
