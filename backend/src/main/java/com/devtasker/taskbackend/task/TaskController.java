package com.devtasker.taskbackend.task;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody CreateTaskRequest request) {
        Task task = new Task(
                UUID.randomUUID(),
                request.title(),
                false
        );
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable String id,
            @RequestBody UpdateTaskRequest request
    ) {
        Task task = taskRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));

        Task updatedTask = new Task(
                task.getId(),
                request.title(),
                request.completed()
        );

        return taskRepository.save(updatedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        if (!taskRepository.existsById(java.util.UUID.fromString(id))) {
            throw new ResponseStatusException(NOT_FOUND);
        }
        taskRepository.deleteById(java.util.UUID.fromString(id));
    }
}
