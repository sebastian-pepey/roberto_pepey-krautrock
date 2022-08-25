const express=require('express');

const productsRouter=express.Router();

const productsController=require('../controller/products.controller');

productsRouter.get('/',productsController.index);

productsRouter.get('/:id',productsController.product);

productsRouter.get('/cart',productsController.cart);

productsRouter.get('/create',productsController.createProduct);

productsRouter.post('/create',productsController.createNewProduct)

module.exports=productsRouter;