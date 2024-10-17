package com.example.Task_Management_app.repository;

import com.example.Task_Management_app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAccountId(Long accountId);
}