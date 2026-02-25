# Services (`src/services`)

The `src/services` directory contains the core **Business Logic** of the application. 

## Core Practices

1. **Isolation from HTTP**: Services should **never** know about `req`, `res`, or headers. They should be pure Javascript functions that compute data and interact with external systems or databases. This makes them significantly easier to Unit Test.
2. **Static Methods**: Like Controllers, export your Services as static classes to create easily accessible namespaces.
3. **Database Interactions**: Services import Mongoose Models directly to interact with the database.

## Example

**`src/services/vulnerability.service.js`**
```javascript
import { Vulnerability } from "../models/vulnerability.model.js";

export class VulnerabilityService {

    static createVulnerability = async (vulnData) => {
        // Business logic, transformations, or checks happen here
        const vulnerability = new Vulnerability(vulnData);
        await vulnerability.save();
        return vulnerability;
    }

    static getVulnerabilityById = async (id) => {
        return Vulnerability.findById(id);
    }
}
```


---

[⬅️ Previous: Controllers](./07-controllers.md) | [Next: Utilities & Errors ➡️](./09-utilities-and-errors.md)
