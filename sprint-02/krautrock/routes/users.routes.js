const express=require('express');

const usersRouter=express.Router();

const usersController=require('../controller/usersController');

usersRouter.get('/',usersController.index);

usersRouter.get('/login',usersController.login);

usersRouter.get('/register',usersController.register);

usersRouter.post('/register',usersController.registerSuccess);

module.exports=usersRouter;