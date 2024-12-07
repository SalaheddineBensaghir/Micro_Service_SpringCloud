package com.micro.billingservice.feign;

import com.micro.billingservice.model.Customer;
import com.micro.billingservice.model.Product;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "customer-service")
public interface CustomerRestClient {
    @GetMapping("/api//customers/{id}")
    @CircuitBreaker(name = "customerServiceCB" , fallbackMethod = "getDefaultCustomer")
     Customer findCustomerById(@PathVariable Long id);

    @GetMapping("/api/customers")
    @CircuitBreaker(name = "customerServiceCB", fallbackMethod = "getDefaultCustomers")
    PagedModel<Customer> getAllCustomers();

    default Customer getDefaultCustomer(Long id,Exception exception){
        return  Customer.builder()
                .id(id)
                .name("Default name")
                .email("Default Email")
                .build();
    }

    default PagedModel<Customer> getDefaultCustomers(Exception exception){
        return PagedModel.empty();
    }
}
