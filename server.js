const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// motor de plantillas 
app.set('view engine', 'ejs');

// se usa para mostrar los archivos estaticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Procesar datos enviados desde forms
app.use(express.json());
// esta linea 👇 hace que se tomen los datos provenientes de html y el servidor los pueda leer como un objeto, se debe usar siempre que se quiera traer datos de un formulario o similar
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));

//variables de entorno
dotenv.config({path: './env/.env'});

// cookies
app.use(cookieParser());

// llamar al router, donde estan todas las rutas 
app.use('/', require('./routes/router'));

// Elimina el cache, hace que no se pueda volver con el boton atras depues de hacer logout
// app.use(function(req,res,next){
//     if(!req.user)
//         res.header('Cache-Control', 'private, no-cache,no-store, must-revalidate');
//     next();
// });

// conexion al puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));