package com.example.Task_Management_app.service;


import com.example.Task_Management_app.model.Account;
import com.example.Task_Management_app.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account registerAccount(Account account) {
        return accountRepository.save(account);
    }
    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }
    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email).orElse(null); // Fetch account from the database
    }

//    public Optional<Account> findByEmail(String email) {
//        return accountRepository.findByEmail(email);
//    }
//
//
//    // Method to check if the provided password matches the hashed password
//    public boolean checkPassword(String rawPassword, String hashedPassword) {
//        return passwordEncoder.matches(rawPassword, hashedPassword); // Check if the passwords match
//    }
}