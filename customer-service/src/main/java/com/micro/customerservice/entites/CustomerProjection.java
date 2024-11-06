package com.micro.customerservice.entites;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "all",types = Customer.class)
public interface CustomerProjection {
    String getName();
    String getEmail();


}
