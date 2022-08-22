const express=require('express');

const productsRouter=express.Router();

const productsController=require('../controller/products.controller');

productsRouter.get('/',productsController.index);

productsRouter.get('/product/:id',productsController.product);

productsRouter.get('/cart',productsController.cart);

module.exports=productsRouter;