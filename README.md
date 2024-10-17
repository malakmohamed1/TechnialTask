# Task Management Application

This project is a Task Management Application with a React frontend and a Spring Boot backend. The application provides a user-friendly interface to manage tasks, including features such as creating, editing, deleting, and viewing tasks. The backend handles data storage, user authentication, and task management logic.


---

## Features
- User authentication and authorization
- CRUD operations for tasks (Create, Read, Update, Delete)
- Responsive UI with React
- RESTful API with Spring Boot
- Data persistence with a relational database

## Technologies Used
### Frontend
- React
- Axios
- React Icons

### Backend
- Spring Boot
- Java
- JPA/Hibernate
- MySQL (or other relational databases)


## Getting Started

### Prerequisites
- **Node.js** and **npm** for the frontend.
- **Java** (JDK 11 or higher) and **Maven** for the backend.
- **MySQL** (or another relational database) for data storage.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend

 ### Install the required dependencies:
npm install
### Start the React development server:
npm start
The application will run on http://localhost:3000.
### Backend Setup
Navigate to the backend directory:

cd backend
Update the application.properties file in src/main/resources with your database configuration:
### properties

spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

### Build the project with Maven:

mvn clean install

### Run the Spring Boot application:

mvn spring-boot:run
The backend server will run on http://localhost:8080.
