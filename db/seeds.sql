USE employeeTrackerDB;

INSERT INTO department (name)
VALUES 
("Accounting"),
("Sales"),
("Engineering"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES 
("Accountant", 70000, 1),
("Sales Lead", 100000, 2),
("Salesperson", 80000, 2),
("Lead Engineer", 150000, 3),
("Software Engineer", 120000, 3),
("HR Specialist", 65000, 4),
("HR Assistant", 60000, 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 1, null),
("Mary", "Smith", 2, null),
("Sarah", "Jessica", 2, 2),
("Matthew", "James", 3, 2),
("Jesse", "Finn", 4, 3),
("Amanda", "Thompson", 5, 4),
("Jason", "Bateman", 7, 6); 
