package org.example.bookstoreserver.controller;


import org.example.bookstoreserver.model.Author;
import org.example.bookstoreserver.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/author")
public class AuthorContrller {
    @Autowired
    private AuthorService authorService;
    @GetMapping()
    public ResponseEntity<List<Author>> getAllAuthor(){
        return ResponseEntity.ok(authorService.getAllAuthor());
    }
}
