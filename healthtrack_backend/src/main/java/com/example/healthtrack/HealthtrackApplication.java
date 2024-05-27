package com.example.healthtrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("com.example.healthtrack.mapper")
public class HealthtrackApplication {
	public static void main(String[] args) {
		SpringApplication.run(HealthtrackApplication.class, args);
	}
}
