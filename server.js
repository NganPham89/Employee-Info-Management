const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'choghegiaSQL01=',
        database: 'employees_db'
      },
      console.log(`Connected to the employees_db database.`)
);

const initQuestion = [
    {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role"]
    }
];

function handleInitQuery(intro) {

}

function initQuery() {
    inquirer
        .prompt(initQuestion)
        .then(

        )
}

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        console.table(res);
    });
};

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
        console.table(res);
    });
};

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        console.table(res);
    });
};

function addDepartment(department) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = department;
    db.query(sql, params, (err, res) => {
        console.log("A new department has been successfully added");
    });

    viewAllDepartments();
};

function addRole(title, salary, id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ?`;
    const values = [[title, salary, id]];
    db.query(sql, [values], (err, res) => {
        console.log("A new role has been successfully added");
    });

    viewAllRoles();
};

function addEmployee(firstN, lastN, rID, mID) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?`;
    const values = [[firstN, lastN, rID, mID]];
    db.query(sql, [values], (err, res) => {
        console.log("A new employee has been successfully added");
    });

    viewAllEmployees();
};

function updateEmployeeRole(rID, eID, lastN) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const values = [rID, eID];
    db.query(sql, values, (err, res) => {
        console.log("This employee's role has been updated successfully");
    });

    viewAllEmployees();
};

