const {viewDepartment} = require('./view_department');
const {viewEmployees} = require('./view_employee');
const {viewRoles} = require('./view_role');
const {addDepartment} = require('./add_department');
const {addEmployee} = require('./add_employee');
const {addRole} = require('./add_role');
const {updateEmployee} = require('./update_employee');
const {promptInit} = require('./prompt_init');

const init = async () => {
    let {request} = await promptInit();
    switch (request) {
        case 'View All Employees':
           await viewEmployees();
            break;
        case 'View All Departments':
           await viewDepartment();
            break;
        case 'View All Roles':
           await viewRoles();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Update Employee Role':
            await updateEmployee();
            break;
        default:
            console.log('Goodbye');
            process.exit();
    }};
    export default init();