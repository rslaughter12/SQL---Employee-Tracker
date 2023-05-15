const mysql = require('mysql');

// create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name',
});

(async () => {
  // load inquirer dynamically
  const inquirer = await import('inquirer');

  // prompt the user for department information
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
      },
      {
        type: 'input',
        name: 'overhead_costs',
        message: 'Enter the overhead costs of the new department:',
        validate: function (value) {
          const valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
      },
    ])
    .then(function (answers) {
      // insert the new department into the database
      const sql = `INSERT INTO departments (department_name, overhead_costs) VALUES ('${answers.name}', ${answers.overhead_costs})`;
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(`Department "${answers.name}" added successfully!`);
        connection.end();
      });
    });
})();