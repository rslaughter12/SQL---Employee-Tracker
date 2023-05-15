const { connectToDatabase, handleDatabaseError, closeDatabaseConnection } = require('../utilities');

// Define a function to update an employee's information in the database
async function updateEmployee(employeeId, employeeData) {
  // Establish a database connection
  const db = await connectToDatabase();

  try {
    // Construct the SQL query to update the employee's information
    const query = `
      UPDATE employee 
      SET 
        first_name = $1,
        last_name = $2,
        role_id = $3,
        manager_id = $4
      WHERE
        id = $5
    `;

    // Execute the SQL query with the provided employee data and ID
    await db.query(query, [
      employeeData.first_name,
      employeeData.last_name,
      employeeData.role_id,
      employeeData.manager_id,
      employeeId
    ]);

    console.log(`Employee with ID ${employeeId} updated successfully.`);
  } catch (error) {
    // Handle any errors that occur during the database operation
    handleDatabaseError(error);
  } finally {
    // Close the database connection when finished
    await closeDatabaseConnection(db);
  }
}

// Export the updateEmployee function for use in other parts of your application
module.exports = updateEmployee;