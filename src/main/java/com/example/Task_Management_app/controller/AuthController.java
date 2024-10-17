package com.example.Task_Management_app.controller;

import com.example.Task_Management_app.model.Account;
import com.example.Task_Management_app.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public Account register(@RequestBody Account account) {
        return accountService.registerAccount(account);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account account) {
        // Fetch the account from the database
        Account existingAccount = accountService.findByEmail(account.getEmail());

        // Check if the account exists and if the password matches
        if (existingAccount != null && existingAccount.getPassword().equals(account.getPassword())) {
            // Successful login, return account ID in a simple response
            Map<String, Long> response = new HashMap<>();
            response.put("accountId", existingAccount.getId());
            return ResponseEntity.ok(response);
        } else {
            // Unauthorized response
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}