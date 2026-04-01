# DevTasker – Backend

This package contains the **Java backend** of the DevTasker project. It provides a simple, explicit REST API backing the frontend task manager.

> This README describes only the backend. See the repository root README for an architectural overview, and the frontend README for UI details.

## Purpose

- Provide a minimal persistence layer for tasks
- Expose a clean REST API
- Serve as a backend counterpart to an offline-first frontend
- Stay intentionally simple and readable

## Tech stack

| Layer        | Choice               |
| ------------ | -------------------- |
| Language     | Java 17              |
| Framework    | Spring Boot          |
| Persistence | JPA + H2 (dev mode)  |
| Database     | PostgreSQL-ready     |

## API overview

### Task representation

```json
{
  "id": "uuid",
  "title": "Task title",
  "completed": false
}
```

### Endpoints

| Method | Path            | Description        |
| ------ | --------------- | ------------------ |
| GET    | /api/tasks      | List all tasks     |
| POST   | /api/tasks      | Create task        |
| PUT    | /api/tasks/{id} | Update task        |
| DELETE | /api/tasks/{id} | Delete task        |

## Development notes

- Uses **H2 in-memory database** by default
- Database resets on backend restart (development behavior)
- Designed so frontend can safely replay mutations

## Local development

```bash
./mvnw spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

## Design philosophy

- Backend is stateless aside from persistence
- No business logic duplication with frontend domain layer
- API accepts explicit intent, not derived state

## License

Private learning project.
