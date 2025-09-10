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
- Validator.js for input validation

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
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/task-manager-api
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login as an existing user

### Tasks

- `GET /api/tasks/get` - Get all tasks for the authenticated user
- `POST /api/tasks/add` - Create a new task
- `GET /api/tasks/:id` - Get a specific task by ID
- `PATCH /api/tasks/update/:id` - Update a specific task
- `DELETE /api/tasks/delete/:id` - Delete a specific task

## Authentication

All task-related endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

None