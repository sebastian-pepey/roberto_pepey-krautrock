const express=require('express');
const router=express.Router();
const productsController=require('../controller/products.controller');
const fileUpload=require('./../middleware/file.middleware');

router.get('/',productsController.products);

router.get('/create',productsController.showForm);

router.post('/create',fileUpload.any('productImage'),productsController.createProduct)

router.get('/:id/cart',productsController.cart);

router.get('/:id/edit',productsController.showEditProduct);

router.put('/:id/edit',fileUpload.any('productImage'),productsController.editProduct);

router.delete('/:id/delete',productsController.deleteProduct);

router.get('/:id',productsController.detail);

module.exports=router;