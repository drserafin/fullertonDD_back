# Fullerton Deal Depot API

## Overview 
This is the backend REST API for the fullerton DEAL DEPOT e-commerece platform. The API is designed to handle requests for products, users, and orders, allowing for seamless integration with any frontend application.

## Features
- CRUD operations for products
- Order Processing
- Browse and view products
- User authentication and management
- Middle for error handling and data validation

## Technologies used
- Node.js
- Express.js
- Postgresql with Vercel

## Project Structure
* `controllers` : This folder is intended for our API logic
* `models`: This folder is where your data models will be defined
* `routes`: this folder will containe your route definitions
* `mode_modules`: This folders contains installed packages and dependencies
* `package.json`: This file contains metadata and dependencies for your project
* `package-lock.json`: This file locks the versions of our dependencies
* `server.js`: This is the main entry point for our API server


To get started make sure to get all the dependencies by typing the following command 
```
npm i
``````


And to start server we type to following command
```
nodemon src/app.js
``````