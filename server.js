const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const connection = require('./database/db');
const app = express();
const authController = require('./controllers/authController');
const PDFDocument = require('pdfkit');
const fs = require('fs');


//variables de entorno
dotenv.config({path: './env/.env'});

// motor de plantillas 
app.set('view engine', 'ejs');

// se usa para mostrar los archivos estaticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Procesar datos enviados desde forms
app.use(express.json());
// esta linea 👇 hace que se tomen los datos provenientes de html y el servidor los pueda leer como un objeto, se debe usar siempre que se quiera traer datos de un formulario o similar
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));


// cookies
app.use(cookieParser());

// llamar al router, donde estan todas las rutas 
app.use('/', require('./routes/router'));

// ******CODIGO PARA GUARDAR LOS DATOS EN LA DB SE DEBE HACER CON C/DATO******
app.post('/guardar-imc', authController.isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;  // Aquí obtienes el ID del usuario autenticado
    const {imc} = req.body;

    // Asegúrate de validar los datos antes de usarlos
    connection.query(
        'INSERT INTO user_data (user_id, imc ) VALUES (?, ?)',
        [userId, imc],
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al guardar los datos.');
            }
            res.status(200).send('Datos guardados exitosamente.');
        }
    );
} catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor.');
}
  });
// ******CODIGO PARA GUARDAR LOS DATOS EN LA DB SE DEBE HACER CON C/DATO******


// app.post('/generate-pdf', (req, res) => {
//     const imcText = req.body.imc;

//     // Extraer el número del texto del IMC
//     const imcNumber = parseFloat(imcText.match(/[\d.]+/)[0]);

//     // Guardar el resultado en la base de datos
//     const query = 'INSERT INTO user_data (result) VALUES (?)';

//     db.query(query, [imcNumber], (err, result) => {
//         if (err) {
//             console.error('Error inserting into database:', err);
//             return res.status(500).send('Server Error');
//         }

//         // Generar el PDF
//         const html = `<h1>${imcText}</h1>`;
//         pdf.create(html).toStream((err, stream) => {
//             if (err) return res.status(500).send(err);
//             res.setHeader('Content-type', 'application/pdf');
//             stream.pipe(res);
//         });
//     });
// });



// conexion al puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));