const inquirer = require("inquirer");

const promptInit = () => {
    const initiPrompt = [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Department',
        'Add Employee',
        'Add Role',
        'Update Employee Role',
        'Exit'
    ]
    return inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: initiPrompt
        }
    ])
};

module.exports = {promptInit};
