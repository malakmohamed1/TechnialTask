//package com.example.Task_Management_app.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in this example
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/**").permitAll() // Allow public access to register and login
//                        .anyRequest().authenticated() // Secure all other endpoints
//                )
//                .httpBasic(Customizer.withDefaults()); // Enable basic authentication
//
//        return http.build();
//    }
//
//}