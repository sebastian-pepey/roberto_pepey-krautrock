// ************ Require's ************
const express=require('express');
const router=express.Router();
const {body}=require('express-validator');

const userRegisterValidation=[
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('birthDate').notEmpty().withMessage('La fecha de nacimiento no puede estar vacía'),
    body('userName').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
    body('email').isEmail().withMessage('El formato de correo electrónico debe ser válido'),
    body('password').isLength({min:8}).withMessage('La contraseña debe tener 8 caracteres'),
    body('pass-repeat').equals('password').withMessage('Las contraseñas deben coinicidir'),
    body('phone').notEmpty().withMessage('Debe ingresar un teléfono')      
]

// ************ Controller Require ************
const usersController=require('../controller/users.controller');

router.get('/login',usersController.formLogin);

router.post('/login',usersController.login);

router.get('/register',usersController.register);

router.post('/register',userRegisterValidation,usersController.save)

module.exports=router;