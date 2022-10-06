// ************ Require's ************
const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const fileUpload=require('./../middleware/file.middleware');
const path=require('path');

const userRegisterValidation=[
    body('fullName').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('birthDate').notEmpty().withMessage('La fecha de nacimiento no puede estar vacía'),
    body('userName').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
    body('email').isEmail().withMessage('El formato de correo electrónico debe ser válido'),
    body('password').isLength({min:8}).withMessage('La contraseña debe tener 8 caracteres'),
    body('passRepeat').custom((value, { req })=>req.body.password!=="" && value===req.body.password).withMessage('Las contraseñas deben coinicidir'),
    body('phone').notEmpty().withMessage('Debe ingresar un teléfono'),
    body('address').notEmpty().withMessage('Debe ingresar una dirección'),
    body('location').notEmpty().withMessage('Debe ingresar un país')
//     body('avatarImage').custom((value, {req}) => {
//         if(req.file.mimetype === 'image/jpeg'){
//             return '.jpeg'; // return "non-falsy" value to indicate valid data"
//         }else{
//             return false; // return "falsy" value to indicate invalid data
//         }
//     })
// .withMessage('La extensión del archivo debe ser .jpeg o .jpg')
]

// ************ Controller Require ************
const usersController=require('../controller/users.controller');

router.get('/login',usersController.formLogin);

router.post('/login',usersController.login);

router.get('/register',usersController.register);

router.post('/register',[fileUpload.single('avatarImage'),userRegisterValidation],usersController.save)

router.get('/profile',usersController.profile);

router.get('/logout',usersController.logout);

module.exports=router;