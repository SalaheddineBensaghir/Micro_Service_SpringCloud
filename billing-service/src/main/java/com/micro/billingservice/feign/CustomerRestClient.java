package com.micro.billingservice.feign;

import com.micro.billingservice.model.Customer;
import com.micro.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "customer-service")
public interface CustomerRestClient {
    @GetMapping("/api//customers/{id}")
     Customer findCustomerById(@PathVariable Long id);

    @GetMapping("/api/customers")
    PagedModel<Customer> getAllCustomers();
}
