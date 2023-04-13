USE employees_db;

INSERT INTO department (name) VALUES 
("Human Resources"),
("Accounting"),
("Marketing"),
("IT");

INSERT INTO role (title, salary, department_id) VALUES
("Recruiter", 70000, 1),
("Executive HR", 90000, 1), 
("Treasurer", 80000, 2), 
("Financial Auditor", 65000, 2),
("Marketing Director", 95000, 3),
("Marketing Analyst", 60000, 3), 
("Network Administrator", 75000, 4),
("Full-stack Developer", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Napoleon", "Bonaparte", 1, NULL), 
("Marie", "Antoinette", 2, NULL),
("Julius", "Caesar", 3, NULL),
("Leonardo", "Da Vinci", 4, NULL),
("William", "Shakespeare", 5, NULL),
("Abraham", "Lincoln", 6, NULL),
("Adolf", "Hitler", 7, NULL),
("Muhammad", "Ali", 8, NULL);

UPDATE employee SET manager_id = 2 WHERE id = 1;
UPDATE employee SET manager_id = 4 WHERE id = 3;
UPDATE employee SET manager_id = 6 WHERE id = 5;