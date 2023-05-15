const inquirer = require('inquirer');
const mysql = require('mysql');

// create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name',
});

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
      choices: function() {
        // get the list of available departments from the database
        return new Promise(function(resolve, reject) {
          const sql = `SELECT id, department_name FROM departments`;
          connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            const choices = results.map(function(department) {
              return {
                name: department.department_name,
                value: department.id,
              };
            });
            resolve(choices);
          });
        });
      },
    },
  ])
  .then(function (answers) {
    // insert the new role into the database
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.department_id})`;
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(`Role "${answers.title}" added successfully!`);
      connection.end();
    });
  });