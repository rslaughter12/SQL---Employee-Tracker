const {db} = require('../connection');

const viewDepartment = () => {
    db.query(`
    SELECT
    department.id AS 'ID',
    department.name AS 'Department'
    FROM department;`,
    (err, resutls) => {
        if (err) {
            console.log(err);
        }
        console.log ('Here are the departments:');
        console.table(resutls);
        console.log('press up or down to continue');
});}