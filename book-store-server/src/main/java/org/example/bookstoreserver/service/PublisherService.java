package org.example.bookstoreserver.service;

import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.model.Publisher;
import org.example.bookstoreserver.repositories.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PublisherService {
    @Autowired
    private PublisherRepository publisherRepository;
    public List<Publisher> getAllPublisher() {
        return publisherRepository.findAll();
    }

    public Publisher getPublisherById(Long id) {
        return publisherRepository.findById(id).orElseThrow(()-> new NotFoundException("Publisher not found"));
    }
}
