const { body } = require('express-validator');

const productCreationValidation = [
    body('name') //not null
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .isLength({ min : 5 })
    .withMessage('El nombre del producto debe tener al menos 5 caracteres'),

    body('list_price') //not null
    .notEmpty()
    .withMessage('El precio de lista no puede estar vacío')
    .isFloat({min : 0})
    .withMessage('El precio de lista debe ser un número mayor a cero'),

    body('quantity') //not null
    .notEmpty()
    .withMessage('La cantidad no puede estar vacía')
    .isFloat({min : 0})
    .withMessage('La cantidad debe ser un entero mayor a cero'),

    body('description') //null
    .notEmpty()
    .withMessage('Debe agregar una descripción'),

    body('category') //not null
    .notEmpty()
    .withMessage('Debe agregar la categoría del artículo')

    //     body('avatarImage').custom((value, {req}) => {
    //         if(req.file.mimetype === 'image/jpeg'){
    //             return '.jpeg'; // return "non-falsy" value to indicate valid data"
    //         }else{
    //             return false; // return "falsy" value to indicate invalid data
    //         }
    //     })
    // .withMessage('La extensión del archivo debe ser .jpeg o .jpg')
]

module.exports = productCreationValidation;