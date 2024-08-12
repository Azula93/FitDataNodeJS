const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const connection = require('./database/db');
const app = express();
const authController = require('./controllers/authController');



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
app.post('/guardar-datos', authController.isAuthenticated,(req, res) => {

     const userId = req.user.id; // Obtén el ID del usuario autenticado
    const { imc, icc, gasto_energetico, macro, vo2, mets, expect_vida } = req.body;

    const query = `
        INSERT INTO user_data (user_id, imc, icc, gasto_energetico, macro, vo2,mets, expect_vida)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            imc = COALESCE(VALUES(imc), imc),
            icc = COALESCE(VALUES(icc), icc),
            gasto_energetico = COALESCE(VALUES(gasto_energetico), gasto_energetico),
            macro = COALESCE(VALUES(macro), macro),
            vo2 = COALESCE(VALUES(vo2), vo2),
            mets = COALESCE(VALUES(mets), mets),
            expect_vida = COALESCE(VALUES(expect_vida), expect_vida);
    `;

    connection.query(query, [userId, imc, icc, gasto_energetico, macro, vo2, mets, expect_vida], (err, results) => {
        if (err) {
            console.error('Error al guardar el dato:', err);
            return res.status(500).send('Error al guardar el dato');
        }
        res.status(200).send('Datos guardados exitosamente');
    });
});
// ******CODIGO PARA GUARDAR LOS DATOS EN LA DB ******


// ELIMINAR DATOS DE "misdatos"
// app.delete('/eliminar-dato/:user_id', authController.isAuthenticated, (req, res) => {
//     const userId = req.user.user_id;
//     const dataId = req.params.user_id;

//     connection.query(
//         'DELETE FROM user_data WHERE user_id = ?',
//         [dataId, userId],
//         (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).send('Error al eliminar el dato.');
//             }
//             res.status(200).send('Dato eliminado exitosamente.');
//         }
//     );
// });

app.delete('/eliminar-dato/:userId', authController.isAuthenticated, async (req, res) => {
    const userId = req.params.userId;

    const query = 'DELETE FROM user_data WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el dato:', err);
            return res.status(500).send('Error al eliminar el dato');
        }

        res.sendStatus(204); // No Content
    });
});

  
// ELIMINAR DATOS DE "misdatos"


// conexion al puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));