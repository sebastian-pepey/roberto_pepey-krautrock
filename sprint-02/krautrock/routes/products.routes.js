const express=require('express');

const productsRouter=express.Router();

const productsController=require('../controller/productsController');

productsRouter.get('/product',productsController.product);

module.exports=productsRouter;