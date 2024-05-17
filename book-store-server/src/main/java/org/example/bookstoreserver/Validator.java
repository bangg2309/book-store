package org.example.bookstoreserver;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Component
public class Validator {
    public List<String> getErrorMessage(BindingResult bindingResult){
        List<FieldError> errors = bindingResult.getFieldErrors();
        List<String> errorMessage = new ArrayList<>();
        for(FieldError error:errors){
            errorMessage.add(error.getField()+": "+ error.getDefaultMessage());
        }
        return errorMessage;
    }
}
