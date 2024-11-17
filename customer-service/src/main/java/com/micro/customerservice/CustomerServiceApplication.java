package com.micro.customerservice;

import com.micro.customerservice.config.CustomerConfigParams;
import com.micro.customerservice.entites.Customer;
import com.micro.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository){
        return args -> {
          customerRepository.save(Customer.builder()
                          .name("Salah").email("salah@gmail.com")
                  .build());
            customerRepository.save(Customer.builder()
                    .name("yassine").email("yasssine@gmail.com")
                    .build());
            customerRepository.save(Customer.builder()
                    .name("khalid").email("khalid@gmail.com")
                    .build());
            customerRepository.findAll().forEach(c->{
                System.out.println("-------------");
                System.out.println(c.getId());
                System.out.println(c.getName());
                System.out.println(c.getEmail());
                System.out.println("-------------");
            });
        };
    }
}
