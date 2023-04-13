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

const deptQuestion = [
    {
        type: "text",
        name: "deptName",
        message: "What is the name of the new department?"
    }
]

const roleQuestion = [
    {
        type: "text",
        name: "title",
        message: "What is the title of the new role?"
    },
    {
        type: "number",
        name: "salary",
        message: "What is the salary for the new role?"
    },
    {
        type: "number",
        name: "deptID",
        message: "Which department does this role belong to? (Enter department ID)"
    }
];

const employeeQuestion = [
    {
        type: "text",
        name: "fName",
        message: "Enter employee's first name"
    },
    {
        type: "text",
        name: "lName",
        message: "Enter employee's last name"
    },
    {
        type: "number",
        name: "roleID",
        message: "What is this employee's role? (Enter role ID)"
    },
    {
        type: "number",
        name: "managerID",
        message: "Who will supervise this employee? (Enter manager ID)"
    }
];

const roleUpdateQuestion = [
    {
        type: "number",
        name: "empID",
        message: "Enter employee ID"
    },
    {
        type: "number",
        name: "roleID", 
        message: "Enter role ID"
    }
];

function handleInitQuery(intro) {
    switch (intro) {
        case "View all departments":
            viewAllDepartments();
            break;
        case "View all roles":
            viewAllRoles();
            break;
        case "View all employees":
            viewAllEmployees();
            break;
        case "Add a department":
            handleDeptQuery();
            break;
        case "Add a role":
            handleRoleQuery();
            break;
        case "Add an employee":
            handleEmployeeQuery();
            break;
        case "Update an employee's role":
            handleRoleUpdateQuery();
            break;
    }
}

function initQuery() {
    inquirer
        .prompt(initQuestion)
        .then(({intro}) => {
            handleInitQuery(intro);
        })
};

initQuery();

function handleDeptQuery() {
    inquirer
        .prompt(deptQuestion)
        .then(({deptName}) => {
            addDepartment(deptName);
        });
};

function handleRoleQuery() {
    inquirer
        .prompt(roleQuestion)
        .then(({title, salary, deptID}) => {
            addRole(title, salary, deptID);
        });
};

function handleEmployeeQuery() {
    inquirer
        .prompt(employeeQuestion)
        .then(({fName, lName, roleID, managerID}) => {
            addEmployee(fName, lName, roleID, managerID);
        });
};

function handleRoleUpdateQuery() {
    inquirer
        .prompt(roleUpdateQuestion)
        .then(({empID, roleID}) => {
            updateEmployeeRole(roleID, empID);
        });
};

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        console.table(res);
    });
    initQuery();
};

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
        console.table(res);
    });
    initQuery();
};

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        console.table(res);
    });
    initQuery();
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

function updateEmployeeRole(rID, eID) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const values = [rID, eID];
    db.query(sql, values, (err, res) => {
        console.log("This employee's role has been updated successfully");
    });

    viewAllEmployees();
};


