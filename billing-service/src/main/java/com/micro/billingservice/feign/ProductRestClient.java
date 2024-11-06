package com.micro.billingservice.feign;

import com.micro.billingservice.model.Customer;
import com.micro.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "inventory-service")
public interface ProductRestClient {
    @GetMapping("/api/products/{id}")
    Product getProductById(@PathVariable String id);

    @GetMapping("/api/products")
    PagedModel<Product> getAllProduct();
}
