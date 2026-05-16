# EduTask Pro — Master Development & Presentation Guide
**Project Classification:** Individual Full-Stack MERN Application  
**System Scope:** Student Task Orchestration & Academic Workspace Ledger

---

## Section 1: Overview & High-Level System Design

* **Header:** EduTask Pro
* **Description:** A Modern System for Student Task Management
* **Framework:** Full-Stack Decoupled Architecture (MERN Stack)

### The Problem
Students experience difficulty handling multiple module deadlines simultaneously. Fragmented tracking methods often cause overlooked priorities, leading to missed assignments and elevated academic stress.

### The Solution
A centralized web application engineered using the MERN stack. It features color-coded importance flags, custom category modules, and an interactive schedule calendar for complete visibility.

---

## Section 2: System Directory Tree Structure

The project utilizes a strictly decoupled architecture, isolating the frontend client views from the backend database server logic.

```text
EduTask-Pro/
├── backend/
│   ├── .postman/                     # Postman local testing environment parameters
│   ├── Controllers/                  # Request Handling Logic (Controller Layer)
│   │   ├── authController.js         # User registration, login verification & JWT generation
│   │   └── taskController.js         # CRUD logic for task matrix interaction
│   ├── DataModels/                   # Database schemas mapped via Mongoose ODM
│   │   ├── Task.js                   # Schema blueprint for assignment tasks
│   │   └── User.js                   # Schema blueprint for user credentials & unique constraints
│   ├── Middleware/                   # Route Security Guard Layer
│   │   └── verifyToken.js            # Intercepts requests to parse and authorize bearer tokens
│   ├── node_modules/                 # Backend Node package dependencies
│   ├── postman/                      # JSON Collections for API regression testing
│   ├── Postman First Check Screen Shots/ # QA route snapshots
│   ├── Routes/                       # Links API endpoints directly to Controllers
│   │   ├── authRoutes.js             # Route endpoints for /api/auth namespace
│   │   └── taskRoutes.js             # Route endpoints for /api/tasks namespace
│   ├── .env                          # Local system environment variables (Private Keys)
│   ├── .gitattributes                # Repository normalization criteria
│   ├── .gitignore                    # Prevents node_modules from uploading to GitHub
│   ├── db.js                         # Database pool connection logic to MongoDB Atlas
│   ├── index.js                      # Main Express server pipeline launcher & runtime hub
│   ├── LICENSE                       # Project distribution permissions parameters
│   ├── package.json                  # Script mappings and dependency manifest
│   └── package-lock.json             # Immutable version lock for backend packages
└── frontend/
    ├── public/                       # Static public folder assets (favicons, icons)
    ├── Screen Shots/                 # User Interface styling development captures
    ├── src/                          # Application source directory
    │   ├── api/                      # Axios network wrapper settings
    │   │   └── index.js              # Custom API configuration setting base paths
    │   ├── components/               # Modular frontend view components
    │   │   ├── Dashboard.jsx         # Task Ledger UI, Calendar Matrix & Status toggles
    │   │   └── Login.jsx             # Dark premium authentication interface
    │   ├── App.css                   # Baseline framework overrides
    │   ├── App.jsx                   # Primary page loading gate & top navigation bar
    │   ├── index.css                 # Main global stylesheet handling Tailwind imports
    │   └── main.jsx                  # Virtual DOM root container injection script
    ├── .gitignore                    # Prevents frontend dependencies from repository tracking
    ├── eslint.config.js              # Syntax correctness checker settings
    ├── index.html                    # Single Page Application viewport anchor page
    ├── package.json                  # Frontend script targets and dependencies manifest
    ├── package-lock.json             # Package tree dependency lock file
    ├── tailwind.config.js            # Custom design tokens, breakpoints, and theme styles
    └── vite.config.js                # Assembly compilation configurations for Vite