# Task Manager API

A RESTful API for managing tasks with user authentication, built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Mark tasks as complete
- Assign tasks to users
- Secure password storage with hashing
- JSON Web Token (JWT) authentication

## Project Structure

```
.
├── config          # Configuration files
├── controllers     # Request handlers
├── middlewares     # Custom middleware functions
├── models          # Database models
├── routes          # API route definitions
├── server.js       # Application entry point
└── package.json    # Project dependencies
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB database (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- `POST /api/auth/login` - Login as an existing user
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- `POST /api/auth/logout` - Logout current user

### Tasks

- `GET /api/tasks/get` - Get all tasks for the authenticated user

- `POST /api/tasks/add` - Create a new task
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "dueDate": "2023-12-31"
  }
  ```

- `PUT /api/tasks/update` - Update a specific task
  ```json
  {
    "taskId": "task_id_here",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "done"
  }
  ```

- `DELETE /api/tasks/remove` - Delete a specific task
  ```json
  {
    "taskId": "task_id_here"
  }
  ```

## Authentication

All task-related endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Testing

Run the included test suite to verify API functionality:

1. Start the server:
   ```bash
   npm start
   ```

2. In a separate terminal, run the tests:
   ```bash
   npm test
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

None