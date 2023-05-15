const mysql = require('mysql');

// create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name',
});

// prompt the user for employee information
import('inquirer').then((inquirer) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the new employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the new employee:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role of the new employee:',
        choices: function() {
          // get the list of available roles from the database
          return new Promise(function(resolve, reject) {
            const sql = `SELECT id, title FROM roles`;
            connection.query(sql, function (error, results, fields) {
              if (error) reject(error);
              const choices = results.map(function(role) {
                return {
                  name: role.title,
                  value: role.id,
                };
              });
              resolve(choices);
            });
          });
        },
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the manager of the new employee:',
        choices: function() {
          // get the list of available managers from the database
          return new Promise(function(resolve, reject) {
            const sql = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees`;
            connection.query(sql, function (error, results, fields) {
              if (error) reject(error);
              const choices = results.map(function(manager) {
                return {
                  name: manager.name,
                  value: manager.id,
                };
              });
              choices.unshift({name: 'None', value: null});
              resolve(choices);
            });
          });
        },
      },
    ])
    .then(function (answers) {
      // insert the new employee into the database
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id})`;
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(`Employee "${answers.first_name} ${answers.last_name}" added successfully!`);
        connection.end();
      });
    });
});

