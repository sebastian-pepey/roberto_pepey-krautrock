const { body } = require('express-validator');

const userRegisterValidation = [
    body('fullName')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío'),

    body('birthDate')
    .notEmpty()
    .withMessage('La fecha de nacimiento no puede estar vacía'),

    body('userName')
    .notEmpty()
    .withMessage('El nombre de usuario no puede estar vacío'),

    body('email')
    .isEmail()
    .withMessage('El formato de correo electrónico debe ser válido'),

    body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener 8 caracteres'),

    body('passRepeat')
    .custom((value, { req }) => req.body.password !== "" && value === req.body.password).withMessage('Las contraseñas deben coinicidir'),
    
    body('phone')
    .notEmpty()
    .withMessage('Debe ingresar un teléfono'),

    body('address')
    .notEmpty()
    .withMessage('Debe ingresar una dirección'),

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

module.exports = userRegisterValidation;