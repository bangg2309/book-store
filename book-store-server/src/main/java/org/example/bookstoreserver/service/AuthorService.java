package org.example.bookstoreserver.service;

import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.model.Author;
import org.example.bookstoreserver.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AuthorService {
    @Autowired
    AuthorRepository authorRepository;
    public List<Author> getAllAuthor() {
        return authorRepository.findAll();
    }

    public Author getAuthorById(Long id)
    {
        return authorRepository.findById(id).orElseThrow(()-> new NotFoundException("Author not found"));
    }
}
