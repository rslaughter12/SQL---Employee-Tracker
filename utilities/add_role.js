const inquirer = await import('inquirer');
const mysql = require('mysql');
const util = require('util');

// create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name',
});

// promisify the connection.query method so we can use async/await
const queryAsync = util.promisify(connection.query).bind(connection);

// prompt the user for role information
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the new role:',
      validate: function (value) {
        const valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department of the new role:',
      choices: async function () {
        // get the list of available departments from the database
        const sql = `SELECT id, department_name FROM departments`;
        const departments = await queryAsync(sql);
        const choices = departments.map(function (department) {
          return {
            name: department.department_name,
            value: department.id,
          };
        });
        return choices;
      },
    },
  ])
  .then(async function (answers) {
    // insert the new role into the database
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [answers.title, answers.salary, answers.department_id];
    const result = await queryAsync(sql, params);
    console.log(`Role "${answers.title}" added successfully!`);
    connection.end();
  })
  .catch(function (error) {
    console.error(error);
    connection.end();
  });
