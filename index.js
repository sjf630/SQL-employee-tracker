const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the Employee Database!");

  startApp();
});

function startApp() {
  inquirer
    .prompt({
      type: "list",
      message: "What operation do you want to perform?",
      name: "choice",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
      ],
    })
    .then((res) => {
      switch (res.choice) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
      }
    });
}

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log("\nAll Employees:\n");
    console.table(res);
    startApp();
  });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log("\nAll Departments:\n");
    console.table(res);
    startApp();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.log("\nAll Roles:\n");
    console.table(res);
    startApp();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept_name",
        message: "Please enter the name of the new department:",
      },
    ])
    .then((res) => {
      connection.query("INSERT INTO department SET ?", {
        department_name: res.dept_name,
      }, (err, res) => {
        if (err) throw err;
        console.log("New department has been successfully added!");
        startApp();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_title",
        message: "Please enter the title of the new role:",
      },
      {
        type: "input",
        name: "role_salary",
        message: "Please enter the salary for the new role:",
      },
      {
        type: "input",
        name: "dept_id",
        message: "Please enter the department ID the role belongs to:",
      },
    ])
    .then((res) => {
      connection.query("INSERT INTO role SET ?", 
      {
        title: res.role_title,
        salary: res.role_salary,
        department_id: res.dept_id,
      }, (err, res) => {
        if (err) throw err;
        console.log("New role has been successfully added!");
        startApp();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "emp_first_name",
        message: "Please enter the first name of the new employee:",
      },
      {
        type: "input",
        name: "emp_last_name",
        message: "Please enter the last name of the new employee:",
      },
      {
        type: "input",
        name: "emp_role_id",
        message: "Please enter the role ID of the new employee:",
      },
      {
        type: "input",
        name: "emp_manager_id",
        message: "Please enter the manager ID of the new employee (if any):",
      },
    ])
    .then((res) => {
      connection.query("INSERT INTO employee SET ?", 
      {
        first_name: res.emp_first_name,
        last_name: res.emp_last_name,
        role_id: res.emp_role_id,
        manager_id: res.emp_manager_id || null, 
      }, (err, res) => {
        if (err) throw err;
        console.log("New employee has been successfully added!");
        startApp();
      });
    });
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "emp_id",
        message: "Please enter the ID of the employee whose role you want to update:",
      },
      {
        type: "input",
        name: "new_role_id",
        message: "Please enter the new role ID:",
      },
    ])
    .then((res) => {
      connection.query("UPDATE employee SET ? WHERE ?", 
      [
        {
          role_id: res.new_role_id,
        },
        {
          id: res.emp_id,
        },
      ], (err, res) => {
        if (err) throw err;
        console.log("Employee role has been successfully updated!");
        startApp();
      });
    });
};



