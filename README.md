E-commerce Backend (Node.js + MySQL)

A simple backend for an e-commerce system using Node.js, Express, MySQL, JWT, Joi, bcrypt, dotenv, CORS.

🚀 Features

User Register & Login (JWT Auth)

Products API

Cart API

Checkout 

MySQL relational database

Input validation using Joi

Password hashing with bcrypt

Central error handling

📦 Tech Stack

Node.js

Express

MySQL2

JWT

Bcrypt

Joi

dotenv

cors

nodemon

⚙️ Setup
1️⃣ Install dependencies
npm install

2️⃣ Create .env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_system
JWT_SECRET=your-secret-key

3️⃣ Run server
npm run dev


Server starts at:

http://localhost:3000

📌 API Routes
Auth (/api/user)

POST /register

POST /login

Products (/api/products)

GET /

GET /:id

Cart (/api/cart)

POST /add

GET /get

DELETE /:id

Checkout (/api/checkout)

POST /
🔐 Authentication

Use token in headers:

Authorization: Bearer <token>
