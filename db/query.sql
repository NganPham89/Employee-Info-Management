--join employee (with itself into manager) then with role and then with department
SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department_name, role.salary, CONCAT(m.first_name," ", m.last_name) AS manager_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
JOIN role ON e.role_id = role.id
JOIN employees_db.department ON role.department_id = department.id;

--join role with department
SELECT role.id, role.title, role.salary, department.name
FROM role
JOIN department ON department.id = role.department_id;

