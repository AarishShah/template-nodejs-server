# Vulnerability Template Server

This project serves as a template for building new microservices in Node.js, demonstrating clean architecture, strict validation and centralized routing.

## Setup & Run

### Prerequisites
- Node.js (v18+)
- MongoDB
- [Phase CLI](https://docs.phase.dev/cli/installation)

### Installation
```bash
npm install
```

### Secret Management (Phase)
This project uses **Phase** for secret management.

1.  **Install Phase CLI**: Follow instructions at [docs.phase.dev](https://docs.phase.dev/cli/installation).
2.  **Initialize Phase**:
    ```bash
    phase init
    ```
3.  **Import Secrets** (First time setup):
    ```bash
    # Import your local .env file
    phase secrets import .env
    ```

### Running the Server
The `dev` and `start` scripts are configured to use `phase run` to inject secrets.

```bash
# Development mode
npm run dev

# Production start
npm start
```

> **Note on Ports**: The 20,000+ port range is selected because these are unprivileged ports (requiring no root access) and usually lie outside the ephemeral port range of most operating systems, effectively avoiding conflicts.

### Running the Server
```bash
# Development mode
npm run dev

# Production start
npm start
```

## Project Structure

The project adheres to a **Standard Layered Architecture** (Controller-Service-Model). This style was chosen to strictly separate concerns: Controllers handle the HTTP transport layer, Services encapsulate business logic, and Models manage database interactions. This leads to a codebase that is predictable, easy to test, and familiar to most Node.js developers.

```text
vulnerabilities/
├── config/             # Configuration (clean env access)
├── controllers/        # Request handlers (Standard)
├── errors/             # Custom Error classes and handlers
├── middlewares/        # Express middlewares (Auth, Validation, Error Handling)
├── models/             # Mongoose Models (Standard)
├── routes/             # Route definitions
│   ├── v1/             # Versioned routes
│   ├── index.js        # Central router (Auth & Rate Limiting applied here)
│   └── system.routes.js# System routes (Health check)
├── services/           # Business Logic (Standard)
├── setup/              # App initialization scripts
├── utils/              # Utilities (Rate Limiter, API Response)
├── validations/        # Joi Validation Schemas
└── app.js              # Entry Point
```

## Key Features

### Centralized Routing & Security
- **Authentication**: Applied globally in `routes/index.js` via `authenticateService`.
- **Rate Limiting**: Applied per-route-group in `routes/index.js`.
    - Vulnerabilities: 50 req/min
    - Remediations: 20 req/min
    - Health Check: 1 req/sec (Strict)

### Validation
- Uses **Joi** for strict schema validation.
- Validation logic resides in `validations/` directory.
- Middleware `middlewares/validate.js` handles schema execution.

### Error Handling
- Global error handler in `middlewares/error-handler.js`.
- Async error catching wrapper `errors/catch-error.js`.
- Standardized API Responses via `utils/api-response.js`.

## 🔗 API Endpoints

### System
- `GET /health` - Health check

### Vulnerabilities
- `GET /api/v1/vulnerabilities` - List vulnerabilities
- `POST /api/v1/vulnerabilities` - Create vulnerability
- `GET /api/v1/vulnerabilities/:id` - Get detail

### Remediations
- `POST /api/v1/remediations` - Create remediation
- `GET /api/v1/remediations/:vulnId` - List remediations for a vulnerability
