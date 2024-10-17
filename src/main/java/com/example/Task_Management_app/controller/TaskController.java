package com.example.Task_Management_app.controller;

import com.example.Task_Management_app.model.Account;
import com.example.Task_Management_app.model.Task;
import com.example.Task_Management_app.service.AccountService;
import com.example.Task_Management_app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private AccountService accountService;

    @GetMapping
    public List<Task> getAllTasks(@RequestParam Long accountId) {

        return taskService.findAllTasks(accountId);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        Long accountId = task.getAccount().getId(); // Get the Account ID from the request body
        Account account = accountService.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with ID: " + accountId));

        task.setAccount(account);

        return taskService.saveTask(task);
    }
    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable Long id) {
        return taskService.findTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return taskService.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted";
    }
}