# Task-Queue

## Distributed Task Queue with Fault Tolerance and Dynamic Scaling

### Introduction
This project implements a robust **distributed task queue system** using **Node.js**, **Express**, Typescript,**MongoDB**, and **BullMQ**. The system processes jobs asynchronously across multiple worker nodes, ensuring **high availability**, **dynamic scaling**, and **fault tolerance**.

### Features
✅ **Task Queue Management**: Utilizes **BullMQ** (based on Redis) to manage task distribution.  
✅ **Scalability**: Supports multiple worker instances for concurrent task processing.  
✅ **Fault Tolerance**:
- Implements **error handling** and logging.
- Supports a **retry mechanism** with exponential backoff.
- Ensures tasks are processed **only once** using **distributed locking** (Redis).  
✅ **Monitoring**: Logs task states (**queued, processing, failed, completed**) for auditing.

---

## Tech Stack
- **Node.js** + **Express** (Backend API)
- **MongoDB** (Database for task tracking)
- **BullMQ** + **Redis** (Task queue & job processing)
- **Jest** + **Supertest** (Unit & integration testing)
- **Docker** + **Docker Compose** (Containerization)

---

## Project Structure
```
📂 project-root
 ┣ 📂 config
 ┃ ┣ 📜 redis.ts  # Redis configuration
 ┃ ┗ 📜 email.ts  # Email service configuration (e.g., SMTP settings)
 ┣ 📂 controllers
 ┃ ┗ 📜 taskController.ts  # Handles API requests
 ┣ 📂 models
 ┃ ┗ 📜 taskModel.ts  # Task schema & model
 ┣ 📂 routes
 ┃ ┗ 📜 taskRouter.ts  # Task API routes
 ┣ 📂 services
 ┃ ┣ 📜 taskService.ts  # Queue logic (add tasks, manage workers)
 ┃ ┗ 📜 emailService.ts  # Handles email sending (e.g., nodemailer integration)
 ┣ 📂 queue
 ┃ ┗ 📜 queue.ts  # Worker processing logic
 ┣ 📂 tests
 ┃ ┣ 📜 taskService.test.ts  # Unit tests
 ┃ ┗ 📜 emailService.test.ts  # Email service tests
 ┣ 📜 .env  # Environment variables
 ┣ 📜 server.ts  # Main Express server
 ┣ 📜 Dockerfile  # Docker setup
 ┣ 📜 docker-compose.yml  # Multi-container setup
 ┗ 📜 README.md  # Documentation
---

## Installation & Setup

### Prerequisites
- **Node.js (v16+)**
- **MongoDB** (Local or cloud-based like MongoDB Atlas)
- **Redis** (For BullMQ queue management)
- **Docker** (Optional for containerization)

### Clone the Repository
```sh
git clone https://github.com/Mo6x/Task-Queue
cd task-queue
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT = 8080
REDIS_PORT = 6379
MONGO_URI = mongodb://localhost:27017/taskQueue
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-email-password

```

### Start MongoDB & Redis (if using Docker)
```sh
docker-compose up -d
```

### Run the Server
```sh
npm run dev  # Runs with Nodemon for hot-reloading
```

---

## API Endpoints
| Method  | Endpoint      | Description |
|---------|-------------|-------------|
| **POST** | `/tasks`    | Add a task to the queue |
| **GET**  | `/tasks/:id` | Get task status by ID |

### Example: Add a Task
```sh
curl -X POST http://localhost:8080/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"data": {"message": "Process this task"}}'
```

Response:
```json
{
  "message": "Task added to queue",
  "taskId": "60bdfc4a1b2d1a3e4c8d9f72"
}
```

---

## Testing
Run unit and integration tests:
```sh
npm run test
```

---

## Deployment

### Using Docker
Build and run the containerized application:
```sh
docker build -t task-queue .
docker run -p 5000:5000 task-queue
```

### Using PM2 for Production
Install PM2 globally and start the app:
```sh
npm install -g pm2
npm run build
pm start
```

---

## Scaling Workers
To scale workers dynamically:
```sh
pm run worker &  # Start a worker instance
npm run worker &  # Start another worker instance
```

To monitor workers:
```sh
npm run monitor
```

---

## License
MIT License © 2024 Christopher Moses


