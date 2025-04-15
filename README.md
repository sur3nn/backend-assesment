Technologies Used

Node.js - v20.17.0

Express.js

MySQL

TypeORM

Multer (for file uploads)

CSV Parser

Cron (for scheduling jobs)

Database Schema

Customers

Products

Orders

OrderItems

Each table is related using appropriate primary and foreign keys.

API Endpoints

1. Upload CSV

POST /api/upload

Upload a CSV file.

Inserts new customers, products, orders, and order items while avoiding duplicates.

2. Revenue Calculations

POST /api/revenue/total
POST /api/revenue/by-product
POST /api/revenue/by-category
POST /api/revenue/by-region

Accepts startDate and endDate in the request body.

Returns corresponding revenue values.

Running the Project

Install dependencies:

npm install

Start the server:

npm run start

Upload a CSV file via /api/upload

Call revenue endpoints to get analytics.

Note

Ensure your database is running and properly connected in your AppDataSource or config file.

Author

Prasanna