# Preface: The Architecture Guide

Welcome to the **Vulnerability Template Server** documentation. This collection of guides acts as a complete "book" to help you, whether you are a seasoned Node.js backend developer, a frontend engineer, or a project manager, understand exactly how this application is structured, step by step.

## What is this project?
This is a "Template Server." It provides a standardized, rock-solid foundation for building backend APIs at our organization. It comes pre-configured with security, error handling, database connections, and a highly predictable folder structure. 

## The Layered Architecture (A Restaurant Analogy)
Before you proceed into the specific chapters, it helps to understand the architectural philosophy. The application is divided into specific "layers." Think of it like a well-run restaurant:

1. **Routes** - *The Host / Front Desk*
   Decides where an incoming request should go. If you ask for the "vulnerabilities" menu, the router sends you to the Vulnerabilities Controller.
2. **Controllers** - *The Waiter*
   Takes your order (the HTTP Request). Looks at what you sent, hands it over to the kitchen (Services), and then brings the final meal (Response) back to you. *Controllers never cook the food themselves.*
3. **Services** - *The Chef (The Kitchen)*
   This represents the "Business Logic." The Chef receives instructions from the Waiter, gathers ingredients from the pantry (Database), and prepares the meal. All the complex math, formatting, or decision-making happens here.
4. **Models & Database** - *The Pantry*
   Models define the exact shape of our ingredients (data). The Database layer is where the actual data is stored and retrieved.
5. **Validations** - *The Bouncer / Health Inspector*
   Checks the incoming request before it even gets fully processed. If someone tries to submit a Vulnerability without a title, the validation layer safely rejects it immediately at the door.
6. **Middlewares** - *The Security Guards*
   Functions that run before a request reaches the Controller. They check if the user is authenticated, if they are making too many requests (Rate Limiting), or handle unexpected errors cleanly.
7. **Utils & Errors** - *The Toolbelt*
   Shared tools used across the restaurant to ensure every response sent back to a user looks exactly the same, or wrapping errors so the server doesn't crash when something goes wrong.

By keeping these layers separate, different team members can work on different parts of the application without stepping on each other's toes, and the application remains easy to test and maintain over time.

---

## Table of Contents

Now that you understand the high-level concept, here is the index for the rest of the guide. We recommend reading them in order to get a full picture of the codebase:

1. **[Architecture & Preface](./01-architecture.md)** *(You are here)*
2. **[Setup (`src/setup`)](./02-setup.md)** - How the app bootstraps itself.
3. **[Configuration (`src/config`)](./03-config.md)** - Environment variables and secrets.
4. **[Models (`src/models`)](./04-models.md)** - Mongoose schemas and data structures.
5. **[Middlewares (`src/middlewares`)](./05-middlewares.md)** - Security, Validation, and global Error Handling.
6. **[Routes (`src/routes`)](./06-routes.md)** - API Endpoints, versioning, and chaining.
7. **[Controllers (`src/controllers`)](./07-controllers.md)** - Handling Requests and Responses without business logic.
8. **[Services (`src/services`)](./08-services.md)** - Core business logic and database interaction.
9. **[Utilities & Errors (`src/utils`, `src/errors`)](./09-utilities-and-errors.md)** - API Response formatting and safe error catching.
10. **[The Request Lifecycle](./10-request-lifecycle.md)** - A complete, step-by-step dry run of a Request flowing through all the layers above.


---

[Next: Setup ➡️](./02-setup.md)
