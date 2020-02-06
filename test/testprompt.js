/**
 * Input prompt example
 */

'use strict';
var inquirer = require('inquirer')
const fs = require('fs');

const employeesJson = __dirname + './../output/employees.json';
const employees = [];

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "Employee Name"
  },
  {
    type: 'input',
    name: 'title',
    message: "Employee Title (Manager, Engineer, Intern)",
    default: function() {
      return 'Engineer';
    }
  }
  
];

inquirer.prompt(questions).then(employee => {
    if (!employee.name) {
        console.error("\n\nERROR:\nMust include a name");
        return;
    }
    console.log(JSON.stringify(employee, null, '  '));
    console.log(JSON.stringify(employeesJson));

    
  
    fs.readFileSync(employeesJson, function (err, employeeData) {
        const json = JSON.parse(employeeData)
        json.employees.push(employee)

        fs.writeFileSync(employeesJson, json)
    })

});