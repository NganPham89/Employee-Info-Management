const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'choghegiaSQL01=',
        database: 'employees_db'
      },
      console.log(`Connected to the INSERT_DB database.`)
);

const inquiries = [
    {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role"],
    },
]

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
