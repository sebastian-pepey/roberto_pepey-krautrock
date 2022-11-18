// ************ Require's ************
const express=require('express');
const router=express.Router();
const fileUpload=require('../../middlewares/file.middleware');
const userRegisterValidation = require('../../middlewares/userValidator.middleware');

// ************ Controller Require ************
const usersController=require('./../../controllers/apis/users.controller');

router.get('/login',usersController.formLogin);

router.post('/login',usersController.login);

router.get('/register',usersController.register);

router.post('/register',[fileUpload.single('avatarImage'),userRegisterValidation],usersController.save)

router.get('/profile',usersController.profile);

router.get('/logout',usersController.logout);

module.exports=router;