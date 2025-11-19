# Fullerton Deal Depot E-Commerce Platform

### Screenshots

![Dashboard Screenshot](https://github.com/user-attachments/assets/7862345b-b31a-4124-9d69-6d23cc79e63f)  
*Dashboard showing product management and order overview*

![Product Page Screenshot](https://github.com/user-attachments/assets/8c261967-41cc-4c67-918d-ca1b30d1d329)  
*Product list with search and filter functionality*

![Order Management Screenshot](https://github.com/user-attachments/assets/55035b3e-fba0-4725-b74e-e3df29984353)  
*Order processing interface for managing customer orders*

---

### Overview

The Fullerton Deal Depot API provides the backend for an e-commerce platform, handling product listings, user management, and order processing. The frontend is a React-based interface that allows customers to browse products and manage their cart.  

**Frontend:** [Fullerton Deal Depot Frontend](http://github.com/tmbkoren/fullertonDD_front)

---

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
- [Project Structure](#project-structure)
- [REST API Diagram Architecture](#rest-api-diagram-architecture)
- [Known Issues](#known-issues)
- [To-do Items](#to-do-items)

---

## Project Description

The Fullerton Deal Depot API allows clients to:

- Create, read, update, and delete (CRUD) products  
- Handle order processing and update stock availability  
- Authenticate and manage users  
- Browse products with search and filtering options  

**Technologies:** Node.js, Express.js, PostgreSQL  
**Deployment:** Vercel

---

## Features

- **Product Management:** Add, edit, delete, and view product details  
- **Order Processing:** Manage orders and update stock  
- **User Authentication:** Register, login, and manage accounts  
- **Product Search:** Filter products with multiple criteria  
- **Error Handling & Validation:** Middleware ensures data integrity  

---

## Installation Instructions

### For Developers

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fullerton-deal-depot.git` 

2.  Navigate to the project directory:
    
    `cd fullerton-deal-depot` 
    
3.  Install the required dependencies:
    
    `npm install` 
    
4.  Set up environment variables:

    -   **Create a `.env` file in the project root**: Copy the contents of `.env.example` (if available) or manually create it. Add the necessary configuration, such as your database URL and other keys.
    
    - **Important**: **Do not include sensitive information in the repository.** Add your own values for the environment variables in your local `.env` file. Here's an example structure for your `.env` file:

    ```plaintext
    POSTGRES_URL=your_database_url_here
    ```

5. Run the backend locally:
    
    ```
    nodemon src/app.js 
    ```


This will start the development server with hot-reloading enabled, and you can access the API at `http://localhost:3000`.

----------

## Project Structure

```bash

├── controllers    # Business logic and API handling
├── models         # Database models and schema
├── routes         # API routes for handling requests
├── node_modules   # Installed dependencies
├── package.json   # Project metadata and dependencies
├── package-lock.json # Locked dependency versions
├── .env           # Environment variables (not committed to GitHub)
├── README.md      # Documentation for the project
└── server.js      # Entry point to the backend server` 
```
----------

# REST API Diagram Architecture
![REST vs. GraphQL: Which API Design Style Is Right for Your Organization?](https://blog.dreamfactory.com/hs-fs/hubfs/Imported_Blog_Media/REST-API_-diagram.png?width=752&height=401&name=REST-API_-diagram.png)
# Known Issues

-   Images are stored locally in development, but may not persist when deployed on platforms like Vercel.
-   Limited testing coverage for edge cases.
-   Scalability issues may arise as the product list grows, due to current image storage methods.

## To-do Items

-   Add authentication and authorization for secure API access.
-   Write additional unit tests for product and order processing functionality.
-   Optimize product search and filtering features.
-   Improve error handling for database transactions.
-   Set up new routes for the new tables (Products, Orders, Users, etc.).

