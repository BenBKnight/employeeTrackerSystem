const mysql = require("mysql");
const inquirer = require("inquirer");
const questions = require("./Master/questionsFile")
const questionEmployee = require("./Master/questionsFile")

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeDB"
});




function allEmployees() {
  const query = "SELECT * FROM employeeDB.employees"
  connection.query(query, function (err, res) {
    console.log(res);
    restartOrExit();
  })
};
function allDepartments() {
  const query = "SELECT * FROM employeeDB.departments"
  connection.query(query, function (err, res) {
    console.log(res);
    restartOrExit();
  })
};
function allRoles() {
  const query = "SELECT * FROM employeeDB.roles"
  connection.query(query, function (err, res) {
    console.log(res);
    restartOrExit();
  })
};

function runSearch() {
  inquirer
    .prompt({
      type: "rawlist",
      name: "startOption",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Roles", "Add Department", "Update Employee Role"
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
          songSearch();
          break;

        case "Add Roles":
          songAndAlbumSearch();
          break;

        case "Add Department":
          songAndAlbumSearch();
          break;

        case "Update Employee Role":
          songAndAlbumSearch();
          break;
      }
    });
}





const restartOrExitQuestion = [{
  type: "confirm",
  name: "action",
  message: "Do you want to return to the Start menu?"
}]
function restartOrExit() {
  inquirer.prompt(restartOrExitQuestion).then(function (answer) {
    switch (answer.action) {
      case true:
        runSearch();
        break;

      case false:
        connection.end
        break;
    }
  })
}







connection.connect(function (err) {
  if (err) throw err;
  console.log("Server running");
  runSearch();
});