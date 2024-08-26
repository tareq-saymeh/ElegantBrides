# ElegantBrides

## Installation

To set up the project on your local machine, please follow the steps below:

### 1. Clone the Repository


Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/tareq-saymeh/ElegantBrides.git
```
### 2. Set Up the Backend

Navigate to the backend directory:
```bash
cd ./backend/
```
Install the required dependencies:
```bash
npm install
```
Create a .env file in the backend folder with the following content:
```bash
MONGO_URI=mongodb+srv://androidsaymeh:oo31sR6eNij5g37x@cluster0.xj0qfnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
JWT_SECRET=837927d6c5ea1fe864dbcbd3fd11e607804e0739a4876b780b1f5164c6128304
SESSION_SECRET=837927d6c5ea1fe864dbcbd3fd11e607804e0739a4876b780b1f5164c6128304
REDIS_HOST=localhost
REDIS_PORT=6379
```
Start the backend server using Nodemon:
```bash
nodemon ./server.js
```
### 3. Set Up the Frontend
Open a new terminal window and navigate to the frontend client directory:
```bash
cd ./frontend/client/
```
Install the required dependencies:
```bash
npm install
```
Start the frontend development server:
```bash
npm start
```




