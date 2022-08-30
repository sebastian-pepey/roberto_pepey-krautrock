// ************ Require's ************
const express=require('express');
const router=express.Router();

// ************ Controller Require ************
const usersController=require('../controller/users.controller');

router.get('/login',usersController.formLogin);

router.post('/login',usersController.login);

router.get('/register',usersController.register);

router.post('/register',usersController.save)

module.exports=router;