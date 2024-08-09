package org.example.server.exceptions.http;

import org.springframework.http.HttpStatus;

public class BadRequestException extends HttpException{

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
