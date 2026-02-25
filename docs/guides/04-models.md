# Models (`src/models`)

The `src/models` directory contains Mongoose schemas. These files define the exact structure, constraints, and defaults for records stored within the MongoDB database.

## Core Practices
- Enforce data types and strict structures.
- Use Mongoose `enum` for allowed string values (e.g., Statuses or Severities).
- Export the compiled `mongoose.model()` to be exclusively used by the Services layer.

## Example

**`src/models/vulnerability.model.js`**
```javascript
import mongoose from "mongoose";

const vulnerabilitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    severity: { 
        type: String, 
        enum: ['Low', 'Medium', 'High', 'Critical'], 
        default: 'Low' 
    },
    status: { 
        type: String, 
        enum: ['Open', 'Resolved', 'False Positive'], 
        default: 'Open' 
    },
    createdAt: { type: Date, default: Date.now }
});

export const Vulnerability = mongoose.model("Vulnerability", vulnerabilitySchema);
```


---

[⬅️ Previous: Configuration](./03-config.md) | [Next: Middlewares ➡️](./05-middlewares.md)
