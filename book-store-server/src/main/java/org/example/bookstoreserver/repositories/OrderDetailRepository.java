package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}