const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const connection = require('../database/db');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


// router para las vistas
// se coloca authController.isAuthenticated para asegurar que el usuario si tiene las credenciales para ingresar al sistema, que si esta autenticado 
router.get('/',authController.isAuthenticated, (req,res)=>{
    res.render('index', { user: req.user })
})

router.get('/login', (req,res)=>{
    res.render('login', {alert:false});
})

router.get('/register', (req,res)=>{
    res.render('register',{alert:false})
})

router.get('/panelcontrol', authController.isAuthenticated, (req,res)=>{
    res.render('panelcontrol', {user:req.user})
})

router.get('/valoracion', authController.isAuthenticated, (req,res)=>{
    res.render('valoracion',{user:req.user})
})

router.get('/pruebaEsfuerzo',authController.isAuthenticated,  (req,res)=>{
    res.render('pruebaEsfuerzo',{user:req.user})
})

router.get('/blog', authController.isAuthenticated, (req,res)=>{
    res.render('blog', {user:req.user})
})

router.get('/misdatos', authController.isAuthenticated, (req,res)=>{
    
    try {
        const userId = req.user.id;
        connection.query('SELECT * FROM user_data WHERE user_id = ?', [userId], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error al obtener los datos del usuario.');
            }
            res.render('misdatos', {user: req.user, datos: results});
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor.');
    }
})

router.get('/generar-pdf', authController.isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userName = req.user.nombreUsuario;
    

    connection.query('SELECT * FROM user_data WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error al obtener los datos del usuario.');
        }

        // Crear el PDF
        const doc = new PDFDocument();
        doc.font('./public/font/Poppins-Regular.ttf');

        // Establecer el encabezado Content-Type para mostrar el PDF en el navegador
        res.setHeader('Content-Type', 'application/pdf');

        // Establecer el encabezado Content-Disposition para mostrar el PDF en el navegador
        res.setHeader('Content-Disposition', 'inline; filename="user_data.pdf"');

        // Enviar el PDF directamente a la respuesta
        doc.pipe(res);

        doc.fontSize(25).text(`Resultados ${userName}`, { align: 'center' });

            // Config TABLA
            const tableTop = 130;
            const itemHeight = 30;
            const tableWidth = 530;
            const columnWidth = tableWidth / 10;


            // Dibujar los encabezados de la tabla
            doc.fontSize(12);
            const headers = ['Dato', 'IMC', 'ICC', 'GET', 'Carbohidratos', 'Proteínas', 'Grasas', 'VO2', 'METS', 'Expect Vida'];
            headers.forEach((header, index) => {
                const xPosition = 50 + index * columnWidth;
                doc.text(header, xPosition, tableTop);
                // Dibujar líneas de encabezado
                if (index === headers.length - 1) {
                    doc.moveTo(xPosition + columnWidth, tableTop).lineTo(xPosition + columnWidth, tableTop + (results.length + 1) * itemHeight).stroke();
                }
                doc.moveTo(xPosition, tableTop).lineTo(xPosition, tableTop + (results.length + 1) * itemHeight).stroke();
            });

            // Dibujar línea superior
            doc.moveTo(50, tableTop).lineTo(50 + tableWidth, tableTop).stroke();
            // Dibujar línea inferior
            doc.moveTo(50, tableTop + (results.length + 1) * itemHeight).lineTo(50 + tableWidth, tableTop + (results.length + 1) * itemHeight).stroke();


            // doc.fontSize(12)
            //     .text('Dato', 50, tableTop)
            //     .text('IMC', 100, tableTop)
            //     .text('ICC', 150, tableTop)
            //     .text('GET', 190, tableTop)
            //     .text('Carbohidratos', 230, tableTop)
            //     .text('Proteínas', 320, tableTop)
            //     .text('Grasas', 380, tableTop)
            //     .text('VO2', 420, tableTop)
            //     .text('METS', 480, tableTop)
            //     .text('Expect Vida', 520, tableTop);
            
            // doc.moveDown();

            results.forEach((row, index) => {
                const yPosition = tableTop + (index + 1) * itemHeight;

                doc.text(index + 1, 50, yPosition)
                    .text(row.imc || 'N/A', 110, yPosition)
                    .text(row.icc || 'N/A', 150, yPosition)
                    .text(row.gasto_energetico || 'N/A', 190, yPosition)
                    .text(row.chos || 'N/A', 230, yPosition)
                    .text(row.proteinas || 'N/A', 320, yPosition)
                    .text(row.grasas || 'N/A', 380, yPosition)
                    .text(row.vo2 || 'N/A', 420, yPosition)
                    .text(row.mets || 'N/A', 480, yPosition)
                    .text(row.expect_vida || 'N/A', 520, yPosition);
            });

             // Dibujar líneas internas de la tabla
             results.forEach((row, index) => {
                const yPosition = tableTop + (index + 1) * itemHeight;
                doc.moveTo(50, yPosition).lineTo(50 + tableWidth, yPosition).stroke();
            });

        doc.end();

   
            // Esperar a que el PDF se escriba antes de responder
            doc.on('finish', () => {
                res.redirect('/generar-pdf'); // Redirige para abrir el PDF en una nueva pestaña
            });
        });
    
});

// router para los metodos del controller 
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;