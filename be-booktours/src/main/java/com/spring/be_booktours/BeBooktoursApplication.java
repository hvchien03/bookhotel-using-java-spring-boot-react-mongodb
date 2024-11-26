package com.spring.be_booktours;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BeBooktoursApplication {
	public static void main(String[] args) {
		SpringApplication.run(BeBooktoursApplication.class, args);
	}
}
