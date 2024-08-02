const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// router para las vistas
// se coloca authController.isAuthenticated para asegurar que el usuario si tiene las credenciales para ingresar al sistema, que si esta autenticado 
router.get('/', (req,res)=>{
    res.render('index')
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

router.get('/valoracion',  (req,res)=>{
    res.render('valoracion')
})

router.get('/pruebaEsfuerzo',  (req,res)=>{
    res.render('pruebaEsfuerzo')
})

router.get('/blog',  (req,res)=>{
    res.render('blog')
})


// router para los metodos del controller 
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;