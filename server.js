const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const connection = require('./database/db');
const app = express();
const authController = require('./controllers/authController');
const Swal = require('sweetalert2');



//variables de entorno
dotenv.config({ path: './env/.env' });

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

// ******CODIGO PARA GUARDAR LOS DATOS EN LA DB ******
// app.post('/guardar-datos', authController.isAuthenticated,  (req, res) => {
//     try {
//         const userId = req.user.id;  // Aquí obtienes el ID del usuario autenticado
//         const formData = req.body;
//         const { imc, icc, gasto_energetico, chos, proteinas, grasas, vo2, mets, expect_vida} = formData;
       
//         connection.query(
//             'INSERT INTO user_data (user_id, imc, icc, gasto_energetico, chos, proteinas, grasas, vo2, mets, expect_vida) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//             [userId, imc, icc, gasto_energetico, chos, proteinas, grasas, vo2, mets, expect_vida],
//             (error, results) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).send('Error al guardar los datos.');
//                 }
//                 res.status(200).send('Datos guardados exitosamente.');
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error en el servidor.');
//     }
// });
app.post('/guardar-imc', authController.isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;  // Aquí obtienes el ID del usuario autenticado
      const {imc, icc} = req.body;
  
      // Asegúrate de validar los datos antes de usarlos
      connection.query(
          'INSERT INTO user_data (user_id, imc,icc ) VALUES (?, ?, ?)',
          [userId, imc,icc],
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
// ******CODIGO PARA GUARDAR LOS DATOS EN LA DB ******


// ELIMINAR DATOS DE "misdatos"
app.delete('/eliminar-dato/:id', authController.isAuthenticated, (req, res) => {
    const userId = req.user.id;
    const dataId = req.params.id;

    connection.query(
        'DELETE FROM user_data WHERE id = ? AND user_id = ?',
        [dataId, userId],
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al eliminar el dato.');
            }
            res.status(200).send('Dato eliminado exitosamente.');
        }
    );
});
  
// ELIMINAR DATOS DE "misdatos"


// conexion al puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));