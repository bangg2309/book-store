package org.example.bookstoreserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundProduct extends RuntimeException {
    
    public ResourceNotFoundProduct (String message) {
        super(message);
    }
}
