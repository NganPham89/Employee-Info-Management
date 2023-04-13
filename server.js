const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const {initQuestion, deptQuestion, roleQuestion, employeeQuestion, roleUpdateQuestion} = require("./lib/questions");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'choghegiaSQL01=',
        database: 'employees_db'
      },
      console.log(`Connected to the employees_db database.`)
);

initQuery();

function initQuery() {
    inquirer
        .prompt(initQuestion)
        .then(({intro}) => {
            handleInitQuery(intro);
        })
};

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
        case "Exit":
            db.end();
            break;
    }
}

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
    const sql = `SELECT * FROM department ORDER BY id`;
    db.query(sql, (err, res) => {
        console.table(`\nList of departments with ID and names`, res);
        return initQuery();
    });
};

function viewAllRoles() {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department_name
                 FROM role
                 JOIN department ON department.id = role.department_id;`;
    db.query(sql, (err, res) => {
        console.table(`\nList of all roles with ID, salary, and department`,res);
        return initQuery();
    });
};

function viewAllEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department_name, role.salary, CONCAT(m.first_name," ", m.last_name) AS manager_name
                 FROM employee e
                 LEFT JOIN employee m ON e.manager_id = m.id
                 JOIN role ON e.role_id = role.id
                 JOIN employees_db.department ON role.department_id = department.id;`;
    db.query(sql, (err, res) => {
        console.table(`\nList of all employees and their roles`,res);
        return initQuery();
    });
};

function addDepartment(department) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = department;
    db.query(sql, params, (err, res) => {
        console.log("\nA new department has been successfully added");
    });

    viewAllDepartments();
};

function addRole(title, salary, id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ?`;
    const values = [[title, salary, id]];
    if (isNaN(salary) || isNaN(id)) {
        console.log("\nSalary and/or department_id must be a number\n");
        return initQuery();
    } else {
        db.query(sql, [values], (err, res) => {
            console.log("\nA new role has been successfully added\n");
        });

        viewAllRoles();
    }
};

function addEmployee(firstN, lastN, rID, mID) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?`;
    const values = [[firstN, lastN, rID, mID]];

    if (isNaN(rID) || isNaN(mID)) {
        console.log(`\nRole ID and Manager ID must be a number\n`);
        return initQuery();
    } else {
        db.query(sql, [values], (err, res) => {
            console.log("\nA new employee has been successfully added");
        });
    
        viewAllEmployees();
    };
};

function updateEmployeeRole(rID, eID) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const values = [rID, eID];
    if (isNaN(rID) || isNaN(eID)) {
        console.log(`\nEmployee ID and new role ID must be a number`);
        return initQuery();
    } else {
        db.query(sql, values, (err, res) => {
            console.log("\nThis employee's role has been updated successfully");
        });
    
        viewAllEmployees();    
    }
};


