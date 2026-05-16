# EduTask Pro — A Task & Reminder Management System for Students

## Problem Description
Students often struggle to manage assignments, deadlines, and reminders effectively. This leads to missed submissions and poor time management.

## Proposed Solution
A web-based system that allows students to create, update, and track tasks with deadlines and reminders. The system helps organize academic work efficiently and improves productivity.

---

## Features
- Add, view, update, and delete tasks (Full CRUD functionality)
- Track deadlines, priority states, and completion status
- Store data securely in MongoDB Atlas via Mongoose ODM
- Decoupled RESTful API architecture with CORS configuration
- Robust backend error handling and input payload validation
- Postman-tested endpoints for regression testing

---

## Technologies Used
- **Frontend Layer:** React.js, Vite, Tailwind CSS, Axios
- **Backend Layer:** Node.js, Express.js
- **Database Layer:** MongoDB Atlas (Cloud NoSQL Database)
- **Testing & Version Control:** Postman, Git & GitHub

---

## API Endpoints

### Authentication Router Namespace (`/api/auth`)

| HTTP Method | Route Endpoint | Payload Requirements | Server Action & Logic |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | `username`, `email`, `password` | Validates data, hashes password, and creates new student document. |
| `POST` | `/api/auth/login` | `email`, `password` | Verifies user credentials and signs a secure JWT access token. |

### Task Ledger Router Namespace (`/api/tasks`)
*Note: All endpoints below are secured via a custom Bearer Token middleware handler (`verifyToken.js`).*

| HTTP Method | Route Endpoint | Payload Requirements | Server Action & Logic |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | None (Requires Auth Header) | Queries MongoDB database to fetch all tasks tied specifically to the authenticated student ID. |
| `POST` | `/api/tasks` | `title`, `description`, `deadline`, `priority` | Instantiates and commits a new task object linked directly to the creator's user account. |
| `PUT` | `/api/tasks/:id` | `title`, `description`, `status`, `priority` | Modifies properties or marks completion milestones for an existing task document matching the `:id`. |
| `DELETE` | `/api/tasks/:id` | None (Requires Auth Header) | Permanently deletes a specific task container entry from the cloud collections. |

---

## Data Validation Blueprints (Mongoose Schema Model)

The database collections enforce strict document rules to guarantee structural data integrity:

```javascript
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Task title is strictly required.'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date,
    required: [true, 'A valid submission deadline date must be declared.']
  },
  priority: {
    type: String,
    enum: ['Low', 'High'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);