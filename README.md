# Multiply.ai Tech Task MonoRepo

## General information

This is a submission of both the frontend and backend tasks issued by Multiply.ai.

As this was 2 seperate tasks, I thought it would make sense to complete them both, but go further and join the 2 tasks together for user creation.

- Frontend: Built with React located in packages/multiply-frontend.
- Backend: A Flask-based API managed with Poetry located in packages/multiply-backend.
- Orchestration: Docker and Docker Compose are used to containerize and manage the services.

This monorepo setup allows for efficient development, dependency management, and streamlined deployment processes.

Some design patterns used were: 
- Service Repository
- Singleton
- Factory

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js (v18 or later)
- npm (comes with Node.js)
- Python (v3.12 or later)
- Poetry (for Python dependency management)
- Lerna (installed globally)
- Docker & Docker Compose (for containerization)

## Scripts
The root package.json includes several scripts to manage the monorepo efficiently.

Available Scripts

```npm run bootstrap```
Installs all dependencies and links packages.

```npm run start```
Runs both frontend and backend services concurrently.

```npm run start:frontend```
Starts the frontend development server.

```npm run start:backend```
Starts the backend service using Docker Compose.

```npm run build:frontend```
Builds the frontend application.

```npm run build:backend```
Builds the backend application.

```npm run build``` 
Builds both frontend and backend.

# Backend Testing
Run backend tests using Docker Compose:

```npm run test:backend```

## Accessing the Application in dev
Frontend: http://localhost:1234
Backend: http://localhost:5000

## Further Work

Some of the work that would be done if I had more time.

- Better abstract the frontend
- Make sure the prod docker scripts are working properly
- Fix the frontend dockerfile
- Add a questionnaire page for goals
- Use a DB rather than in memory storage
- When using a DB, we could use a joining table for goals rather than having the user id on every entry
- Add better error handling to both frontend and backend
- Add swagger docs to the api
- Linting and formatting
- Lerna for versioning
- Github actions for deployments
- Fix api unittests
- Add frontend functional test

And many many more.

