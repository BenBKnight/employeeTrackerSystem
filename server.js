// All global variables
const mysql = require("mysql");
const inquirer = require("inquirer");
const listOfEmployees = [];
const roleList = [];
const departmentsList = [];
var employeeManager;
var employeeRole;
var employeeFirst;
var employeeLast;
var departmentAdd;
var updateSalary;
var updateTitle;
var updateDepartmentId;
var employeeBothNames;
var chosenRoleToUpdateId;

//Mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB",
  multipleStatements: true
});

//List all functions 
function allEmployees() {
  const query = "SELECT * FROM employeeDB.employees"
  connection.query(query, function (err, res) {
    for (i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name)
    }
    restartOrExit();
  })
};
function allDepartments() {
  const query = "SELECT * FROM employeeDB.departments"
  connection.query(query, function (err, res) {
    for (i = 0; i < res.length; i++) {
      console.log(res[i].name)
    }
    restartOrExit();
  })
};
function allRoles() {
  const query = "SELECT * FROM employeeDB.roles"
  connection.query(query, function (err, res) {
    for (i = 0; i < res.length; i++) {
      console.log(res[i].title)
    }
    restartOrExit();
  })
};


//Add date functions
function addEmployee() {
  inquirer.prompt(addEmployeeQuestions)
    .then(function (answer) {
      employeeFirst = answer.firstName;
      employeeLast = answer.lastName;
      //Change Role into Role ID from DB
      const roleQuery = "SELECT id FROM roles WHERE ?";
      connection.query(roleQuery, { title: answer.roleId }, function (err, res) {
        employeeRole = res[0].id;
      });
      //Change Manager into Manager ID from DB
      let managerName = answer.manager.split(" ")
      let managerFirst = managerName[0];
      let managerLast = managerName[1]
      const managerQuery = "SELECT id FROM employees WHERE ?"
      connection.query(managerQuery, [{ first_name: managerFirst }, { last_name: managerLast }], function (err, res) {
        employeeManager = res[0].id;
        const employeeToPush = new NewEmployee(employeeFirst, employeeLast, employeeRole, employeeManager);
        const query = "INSERT INTO employees SET ?";
        connection.query(query, employeeToPush);
        restartOrExit();
      });
    })
};
function addRoles() {
  inquirer.prompt(roleQuestions).then(answer => {
    const queryFind = "SELECT id FROM departments WHERE ?"
    //Query takes user desired department and receives that department's ID
    connection.query(queryFind, { name: answer.department }, (err, res) => {
      departmentAdd = res[0].id
      // Constructor complies information
      const roleToPush = new NewRole(answer.title, answer.salary, departmentAdd);
      const queryAdd = "INSERT INTO roles SET ?";
      // Query sends new data set
      connection.query(queryAdd, roleToPush);
      restartOrExit();
    })
  })
};
function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "newDepartment",
    message: "What department would you like to add?"
  }).then(answer => {
    const queryAdd = "INSERT INTO departments SET ?";
    connection.query(queryAdd, { name: answer.newDepartment }, (err, res) => {
      restartOrExit();
    });

  })
};

//Update data functions
function updateRole() {
  inquirer.prompt(updateRoleQuestions).then(answer => {
    updateSalary = answer.salary;
    updateTitle = answer.title;
    const updateDepartmentQuery = "SElECT id FROM departments WHERE ?";
    connection.query(updateDepartmentQuery, { name: answer.department }, (err, res) => {
      updateDepartmentId = res[0].id;
      const updateQuery = "UPDATE roles SET salary = '" + updateSalary + "', department_id = '" + updateDepartmentId + "'  WHERE title = '" + updateTitle + "'";
      connection.query(updateQuery, (err, res) => {
        restartOrExit();
      })
    })
  })
};
function updateEmployeeRole() {
  inquirer.prompt(employeeRoleUpdateQuestions).then(answer => {
    employeeBothNames = answer.name.split(" ");
    employeeFirst = employeeBothNames[0];
    employeeLast = employeeBothNames[1];
    chosenRoleToUpdate = answer.role;
    const roleQueryEmployeeUpdate = "SELECT id FROM roles WHERE ?";
    connection.query(roleQueryEmployeeUpdate, { title: chosenRoleToUpdate }, (err, res) => {
      chosenRoleToUpdateId = res[0].id;
      // const updateEmployeeQuery = "UPDATE role_id SET " + chosenRoleToUpdateId + " FROM employees WHERE first_name = " + employeeFirst + " AND last_name = " + employeeLast ;
      const updateEmployeeQuery = "UPDATE employees SET role_id = '" + chosenRoleToUpdateId + "' WHERE first_name = '" + employeeFirst + "' AND last_name = '" + employeeLast + "'";
      connection.query(updateEmployeeQuery, (err, res) => {
        restartOrExit();
      })
    })
  })

};

//Functions to create current lists of data
function allEmployeesFunction() {
  listOfEmployees.length = 0;
  const query = "SELECT * FROM employeeDB.employees"
  connection.query(query, function (err, res) {
    for (i = 0; i < res.length; i++) {
      let employeeNameOnly = res[i].first_name + " " + res[i].last_name;
      listOfEmployees.push(employeeNameOnly);
    }
  })
};
function allRolesList() {
  roleList.length = 0;
  const query = "SELECT * FROM employeeDB.roles"
  connection.query(query, function (err, res) {
    for (i = 0; i < res.length; i++) {
      let roleTitles = res[i].title;
      roleList.push(roleTitles);
    }
  })
};
function allDepartmentsList() {
  departmentsList.length = 0;
  const query = "SELECT * FROM employeeDB.departments"
  connection.query(query, function (err, res) {
    for (i = 0; i < res.length; i++) {
      let newDepartment = res[i].name;
      departmentsList.push(newDepartment);
    }
  })
};

//Question arrays 
const employeeRoleUpdateQuestions = [{
  type: "rawlist",
  name: "name",
  message: "Whose role would you like to update?",
  choices: listOfEmployees
}, {
  type: "rawlist",
  name: "role",
  message: "What role would you like to change them to?",
  choices: roleList
}];
const updateRoleQuestions = [{
  type: "rawlist",
  name: "title",
  message: "Which role would you like to update?",
  choices: roleList
}, {
  type: "input",
  name: "salary",
  message: "What is the new salary of the position?"
}, {
  type: "rawlist",
  name: "department",
  message: "To what department does this position belong?",
  choices: departmentsList
}];
const roleQuestions = [{
  type: "input",
  name: "title",
  message: "What is the new title name?"
}, {
  type: "input",
  name: "salary",
  message: "What is the salary of the new position?"
}, {
  type: "rawlist",
  name: "department",
  message: "To what department does this position belong?",
  choices: departmentsList
}];
const addEmployeeQuestions = [{
  type: "input",
  name: "firstName",
  message: "What the employee's first name?"
}, {
  type: "input",
  name: "lastName",
  message: "What the employee's last name?"
}, {
  type: "rawlist",
  name: "roleId",
  message: "What is the employee's position?",
  choices: roleList
}, {
  type: "rawlist",
  name: "manager",
  message: "Who is the manager of this Employee?",
  choices: listOfEmployees
}];
const restartOrExitQuestion = [{
  type: "confirm",
  name: "action",
  message: "Do you want to return to the Start menu?"
}];

//Constructors for adding data
class NewEmployee {
  constructor(first_name, last_name, role_id, manager_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }
};
class NewRole {
  constructor(title, salary, department_id) {
    this.title = title;
    this.salary = salary;
    this.department_id = department_id
  }
};

//Main function to direct user based on a question
const startingQuestions = function () {
  inquirer
    .prompt({
      type: "rawlist",
      name: "startOption",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Roles", "Add Department", "Update a Role", "Update Employee's Role"
      ]
    })
    .then(function (answer) {
      switch (answer.startOption) {
        case "View All Employees":
          allEmployees();
          break;

        case "View All Departments":
          allDepartments();
          break;

        case "View All Roles":
          allRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Roles":
          addRoles();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update a Role":
          updateRole();
          break;
        case "Update Employee's Role":
          updateEmployeeRole();
          break;
      }
    })
};

//Function to see if user is done or not
function restartOrExit() {
  inquirer.prompt(restartOrExitQuestion).then(function (answer) {
    switch (answer.action) {
      case true:
        runSearch();
        break;

      case false:
        connection.end();
        break;
    }
  })
};

//First function to update lists before directing logic to startingQuestions function
function runSearch() {
  allEmployeesFunction();
  allRolesList();
  allDepartmentsList();
  startingQuestions();
};

//Main connection and initializes program
connection.connect(function (err) {
  if (err) throw err;
  console.log("Server running");
  runSearch();
});