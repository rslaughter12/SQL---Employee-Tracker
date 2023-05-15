const {db} = require('../connection');

const viewRole = () => {
    db.query(`
    SELECT
    role.id AS 'ID',
    role.title AS 'Title',
    role.salary AS 'Salary',
    department.name AS 'Department'
    FROM role
    JOIN department ON role.department_id = department.id;`,
    (err, resutls) => {
        if (err) {
            console.log(err);
        }
        console.log ('Here are the roles:');
        console.table(resutls);
        console.log('press up or down to continue');
});};

