package com.micro.inventoryservice;

import com.micro.inventoryservice.entites.Product;
import com.micro.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository){
        return args -> {
            productRepository.save(Product.builder()
                            .id(UUID.randomUUID().toString())
                            .name("PC")
                            .price(10000)
                            .quantity(12)
                    .build());
            productRepository.save(Product.builder()
                    .id(UUID.randomUUID().toString())
                    .name("Smart Phone")
                    .price(10000)
                    .quantity(12)
                    .build());
            productRepository.save(Product.builder()
                    .id(UUID.randomUUID().toString())
                    .name("Printer")
                    .price(10000)
                    .quantity(12)
                    .build());

            productRepository.findAll().forEach(p->{
                System.out.println(p.toString());
            });
        };

    }
}
