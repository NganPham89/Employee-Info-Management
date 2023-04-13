const initQuestion = [
    {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role", "Exit"]
    }
];

const deptQuestion = [
    {
        type: "text",
        name: "deptName",
        message: "What is the name of the new department?"
    }
];

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
        message: "What new role would you assign this employee? (Enter role ID)"
    }
];

module.exports = {initQuestion, deptQuestion, roleQuestion, employeeQuestion, roleUpdateQuestion};