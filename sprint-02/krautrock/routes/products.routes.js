const express=require('express');

const productsRouter=express.Router();

const productsController=require('../controller/products.controller');

productsRouter.get('/product',productsController.product);

productsRouter.get('/cart',productsController.cart);

module.exports=productsRouter;