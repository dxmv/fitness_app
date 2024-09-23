package org.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class DeleteResponse {
    private String message;
    private final int statusCode = HttpStatus.OK.value();
}
