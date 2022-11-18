const db = require('./../../database/models');

// const fs = require('fs');
// const path = require('path');

// // const deleteFiles = require('./helpers/deleteFiles');
// const {validationResult} = require('express-validator');

// function deleteFiles(array, dontErase, route) {

//     for (let i = 0; i < array.length; i++) {

//         let fullRoute = path.join(__dirname, route, array[i].name);

//         if (array[i].name !== dontErase) {

//             fs.stat(fullRoute, (err) => {
//                 if (!err) {
//                     fs.unlinkSync(fullRoute);
//                 }
//             });
//         }
//     }
// }

const productsController = {

    // // CREATE

    // createProduct: async (req, res) => {

    //     let categories = await db.Category.findAll();

    //     const error = validationResult(req);

    //     if (! error.isEmpty()) {

    //         const oldData = req.body;

    //         console.log(oldData);

    //         res.render('products/create-product', {
    //             errorMessages: error.mapped(),
    //             oldData,
    //             user:req.session.userLogged,
    //             categories
    //         })

    //     } else {

    //         let createdProduct = await db.Product.create({
    //             name: req.body.name,
    //             list_price: parseFloat(req.body.list_price.replace(',', '.')),
    //             quantity: parseInt(req.body.quantity),
    //             description: req.body.description,
    //             sold: false,
    //             discount: req.body.discount === "on",
    //             used: req.body.used,
    //             id_category: req.body.category,
    //             discount_amount: (req.body.discount === "on" ? 1 : 0) * parseInt(req.body.discount_amount), // crear
    //             free_shipment: req.body.free_shipment === "on",
    //             payments: req.body.payments === "on"
    //         })
    
    //         if (req.files.length === 0) {
    
    //             db.Image.create({name: 'default-image.png', id_product: createdProduct.id});
    
    //         } else {
    //             for (file of req.files) {
    
    //                 db.Image.create({name: file.filename, id_product: createdProduct.id})
    
    //             }
    //         } db.ProductUser.create({id_user: req.session.userLogged.id, id_product: createdProduct.id})
    
    //         res.redirect('/users/profile');
    //     }
    // },

    // READ

    products: (req, res) => {
        db.Product.findAll({
            include: {
                association : 'image',
                required: true
            }
        }).then(product => {
            res.status(200).json({product})
        });

    },

    categories: (req,res) => {
        db.Category.findAll()
        .then(categories => {
            res.status(200).json({categories})
        });
    }

    // detail: async (req, res) => {

    //     let categories = await db.Category.findAll();

    //     let product = await db.Product.findByPk(req.params.id, {
    //         include: [
    //             {
    //                 association : 'image'
    //             }, {
    //                 association : 'user'
    //             }
    //         ]
    //     });

    //     res.render('products/detail', {
    //         product,
    //         user: req.session.userLogged,
    //         categories
    //     });
    // },

    // cart: async (req, res) => {

    //     let categories = await db.Category.findAll();

    //     let product = await db.Product.findByPk(req.params.id, {
    //         include: [
    //             {
    //                 association : 'image'
    //             }, {
    //                 association : 'user'
    //             }
    //         ]
    //     });

    //     res.render('products/cart', {
    //         product,
    //         user: req.session.userLogged,
    //         categories
    //     });
    // },

    // showForm: async (req, res) => {

    //     let categories = await db.Category.findAll();

    //     res.render('products/create-product', {
    //         user: req.session.userLogged,
    //         categories
    //     });
    // },

    // // UPDATE

    // showEditProduct: async (req, res) => {

    //     let categories = await db.Category.findAll();

    //     let product = await db.Product.findByPk(req.params.id, {
    //         include: {
    //             association: 'image',
    //             required: true
    //         }
    //     });

    //     res.render('products/edit-product', {
    //         product,
    //         user: req.session.userLogged,
    //         categories
    //     })
    // },

    // editProduct: async (req, res) => {

    //     let categories = await db.Category.findAll();

    //     const error = validationResult(req);

    //     if (! error.isEmpty()) {

    //         const oldData = req.body;

    //         oldData.id = req.params.id;

    //         console.log(oldData);

    //         res.render('products/edit-product', {
    //             errorMessages: error.mapped(),
    //             product: oldData,
    //             user:req.session.userLogged,
    //             categories
    //         })

    //     } else {

    //         console.log('ingresa al else',req.params.id);

    //         db.Product.update({
    //             name: req.body.name,
    //             list_price: parseFloat(req.body.list_price.replace(',', '.')),
    //             quantity: parseInt(req.body.quantity),
    //             description: req.body.description,
    //             discount: req.body.discount === "on",
    //             id_category: req.body.category,
    //             discount_amount: (req.body.discount === "on" ? 1 : 0) * parseInt(req.body.discount_amount),
    //             free_shipment: req.body.free_shipment === "on",
    //             payments: req.body.payments === "on"
    //         }, {
    //             where: {
    //                 id: req.params.id
    //             }

    //         }).then(() => {
    
    //             if (req.files.length !== 0) {
    
    //                 db.Image.destroy({
    //                     where: {
    //                         id_product: req.params.id
    //                     }
    //                 })
    
    //                 for (file of req.files) {
    //                     db.Image.create({name: file.filename, id_product: req.params.id})
    //                 }
    //             }
    //         })
    
    //         res.redirect('/products');

    //     }
    // },

    // // DELETE

    // deleteProduct: (req, res) => {

    //     db.Image.findAll({
    //         where: {
    //             id_product: req.params.id
    //         }
    //     }).then((image) => {
    //         deleteFiles(image, 'default-image.png', './../public/img/products/')
    //     }).then(() => {
    //         db.Image.destroy({
    //             where: {
    //                 id_product: req.params.id
    //             }
    //         })
    //     }).then(() => {
    //         db.ProductUser.destroy({
    //             where: {
    //                 id_product: req.params.id
    //             }
    //         })
    //     }).then(() => {
    //         db.Product.destroy({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //     }).then(res.redirect('/users/profile'))
    // },

    // showCategory: async (req,res) => {

    //     let categories = await db.Category.findAll();

    //     let products = await db.Product.findAll({
    //         include: {
    //             association : 'image',
    //             required: true
    //         },

    //         where : {
    //             id_category : req.params.id
    //         }
    //     });

    //     res.render('products/products', {
    //         products,
    //         user : req.session.userLogged,
    //         categories
    //     });
    // }
}

module.exports = productsController;
