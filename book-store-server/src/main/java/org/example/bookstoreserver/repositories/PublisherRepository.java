package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    static Publisher findByName(String publisherName);
}