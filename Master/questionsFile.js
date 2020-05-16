const inquirer = require("inquirer");

const questions = [{
    type: "list",
    name: "startOption",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Roles", "Add Department", "Update Employee Role"]
}]
const questionEmployee = [{
    type: "input",
    name: "employeeName",
    message: "What employee would you like to search for?"
}]
const restartOrExit = [{
    type: "confirm",
    name: "restartOrExit",
    message: "Do you want to return to the Start menu?"
}]

module.exports = questions, questionEmployee