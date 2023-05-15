const {db} = require('../connection');

const viewEmployee = () => {
    db.query(`SELECT
     employee.id, 
     employee.first_name AS 'First Name', 
     employee.last_name AS 'Last Name', 
     role.title AS 'Job Title',
     department.name AS Department, 
     role.salary AS Salary, 
     manager.first_name AS 'Manager First Name',
     manager.last_name AS 'Manager Last Name',
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON employee.role_id = manager.id;`, 
    (err, resutls) => {
        if (err) {
            console.log(err);
        }
        console.log ('Employees:');
        console.table(resutls);
        console.log('press up or down to continue');
});};

