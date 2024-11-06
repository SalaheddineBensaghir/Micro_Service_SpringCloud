package com.micro.billingservice.repository;

import com.micro.billingservice.entites.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill ,Long> {
}
