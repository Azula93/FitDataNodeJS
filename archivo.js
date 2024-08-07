// Suponiendo que formulaImc es una función previamente definida que calcula e imprime la fórmula para obtener un valor en formato adecuado. 
async function guardarResultadosIMC() {
    try {
        // Realizamos la solicitud POST al endpoint '/guardar-datos' del servidor API con los datos de IMC calculados
        const response = await fetch('/guardar-datos', {
            method: 'POST',           // Método HTTP a utilizar (en este caso, se usa POST)
            headers: {                // Cabecera para indicar que el cuerpo del mensaje es en formato JSON. 
                'Content-Type': 'application/json'   
            },                        // Se especifica la estructura de datos enviados como un objeto literal (JSON).
            body: JSON.stringify({ imc })   // Convertimos los datos al formato JSON y lo pasamos en el cuerpo de nuestra solicitud. Aquí solo se envía una propiedad llamada 'imc'. Si necesitas más propiedades, añádelas dentro del objeto literal ({ ... }).
        }); 
        
        if (!response.ok) { // Verificamos si la respuesta es exitosa (la bandera response.ok se usa para verificar que el código de estado HTTP está en el rango OK, los cuales van desde 200 a 299).  
            throw new Error('Error al guardar el resultado del IMC: ' + response.statusText); // Si la solicitud falla (no es exitosa), lanzamos un error con información detallada sobre lo que sucedió, incluyendo cualquier mensaje de estado texto proporcionado por el servidor API en caso de fallo.
        } else {            
            const resultadosIMC = await response.json(); // Si la respuesta es exitosa (es decir, se recibió un código HTTP OK), obtenemos los datos del resultado como una promesa resolviendo y luego le decodificamos a JSON usando el método .json(), que también devuelve otra promesa para permitir operaciones asíncronas.
            console.log('Datos de IMC recibidos:', resultadosIMC); // Mostramos los datos obtenidos en la consola, aunque puede ser cualquier otro manejo según sea necesario (por ejemplo, almacenarlos en una base de datos o procesar más). 
        }                              
    } catch (error) {        
        console.error('Error durante el envío del IMC:', error); // Si se produce algún error durante la solicitud POST (incluyendo manejos inesperados, como fallas en redes o problemas con CORS), lo mostramos por consola para depuración y monitoreo.
    }       
}   



// Para lograr la integración y funcionalidad requerida, es importante garantizar que estás validando tanto los datos de entrada como las credenciales del usuario antes de proceder con cualquier operación CRUD (Create, Read, Update, Delete). A continuación se presenta una implementación detallada utilizando un middleware `authController.isAuthenticated` para verificar si el usuario está autenticado y luego realizar la inserción del nuevo registro en la base de datos:

// ```javascript
// Import required modules and authentication controller at the beginning of your file/module (assuming ExpressJS)
const express = require('express');
const { promisify } = require('util'); // For handling promise-based database operations if needed.
const mysql = require('mysql2'); 
const authController = require('./authController'); // Your authentication controller module that contains isAuthenticated middleware function and other related functions for user management.

// Initialize your Express application (if not already done)
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies in Express applications

// Connecting to the database with a promise-based approach if needed, or directly using mysql2's connection object methods:
let dbConnection;
try {
    dbConnection = await promisify(mysql.createConnection)(/* your DB config */); // replace /* your DB config */ with actual configuration details 
} catch (dbError) {
   throw new Error('Failed to connect to the database');
}

// Middleware for checking authentication before accessing protected routes:
app.use('/api/', authController.isAuthenticated);

/**
 * Endpoint to POST IMC data from authenticated user and store it in a single row of 'user_data' table. 
 */
app.post('/guardar-datos', async (req, res) => {
    try {
        // Extract formData as an object using destructuring:
        const { imc, icc, gasto_energetico, chos, proteinas, grasas, vo2, mets, expect_vida } = req.body; 
        
        if (!imc || !icc || typeof (gasto_energetico) !== 'number' /* ... other data type validations as required */) {
            return res.status(400).send('Invalid input parameters'); // Handle invalid inputs appropriately, consider using Express error-handling middleware for cleaner code and centralized handling of errors/responses if needed.
        } 
        
        const userId = req.user.id; // User ID from the current request context (after successful authentication) provided by your authController's isAuthenticated middleware, which should be properly implemented in that module:

        await dbConnection.beginTransaction(); // Begin a database transaction to ensure atomicity of insertion operation 
        
        const result = await dbConnection.query(
            'INSERT INTO user_data (user_id, imc, icc, gasto_energetico, chos, proteinas, grasas, vo2, mets, expect_vida) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, imc, icc, gasto_energetico /* ... other values */], // Note: Assuming that 'expect_vida' is the expected lifespan field and should also be included in your INSERT query 
        );
        
        await dbConnection.commit(); // Commit transaction on successful insertion to persist changes into database permanently (use try/catch for rollback if needed)
        
        res.status(201).send(`New IMC data record created successfully with id: ${result.insertId}`); 
    } catch (error) {
        await dbConnection.rollback(); // Roll back transaction in case of any error during insertion operation to maintain database consistency/atomicity; also handle and respond appropriately based on the nature of errors that can occur, such as re-throwing them or returning an appropriate HTTP status code with a message (e.g., 500 - Internal Server Error)
        console.error(error); // Log error for debugging purposes
        
        res.status(500).send('Internal server error occurred while processing your request');
    } finally {
        dbConnection?.end(); // Ensure database connection is closed after the operation or in case of an exception (optional, depending on whether you're using a pooling strategy)
    } 
});
```
This code assumes that `authController.isAuthenticated` middleware and your other authentication-related functions are correctly implemented within their respective module (`/authController`). The `/api/guardar-datos` endpoint should be accessible only after the user has passed through this security check, ensuring data integrity by requiring a logged in state before attempting database operations. Additionally, proper error handling is demonstrated to maintain robustness and provide informative feedback for both client applications consuming your API as well as internal monitoring or debugging activities.