const express=require('express');
const router=express.Router();
const productsController=require('../controllers/products.controller');
const fileUpload=require('../middlewares/file.middleware');
const productCreationValidator = require('../middlewares/productValidator.middleware');

router.get('/',productsController.products);

router.get('/create',productsController.showForm);

router.post('/create',[fileUpload.any('productImage'),productCreationValidator],productsController.createProduct);

router.get('/category/:id',productsController.showCategory);

router.get('/:id/cart',productsController.cart);

router.get('/:id/edit',productsController.showEditProduct);

router.put('/:id/edit',[fileUpload.any('productImage'),productCreationValidator],productsController.editProduct);

router.delete('/:id/delete',productsController.deleteProduct);

router.get('/:id',productsController.detail);

module.exports=router;