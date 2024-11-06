package com.micro.billingservice.repository;

import com.micro.billingservice.entites.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductItemRepository extends JpaRepository<ProductItem,String> {
}
