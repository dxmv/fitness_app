package org.example.server.exceptions;

import org.example.server.exceptions.http.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    // handles all http errors
    @ExceptionHandler(HttpException.class)
    public ResponseEntity<ErrorResponse> resourceNotFoundException(HttpException ex, WebRequest request) {
        System.out.println(ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(ex.getStatus().value(),ex.getMessage(),request.getDescription(false)), ex.getStatus());
    }

    // handles all other errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> allExceptionsHandler(Exception ex, WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(500,ex.getMessage(),request.getDescription(false)), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

