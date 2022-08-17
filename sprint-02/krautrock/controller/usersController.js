const path=require('path');

const usersController={
    
    index: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/index.html'));
    },

    register: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/register.html'));
    },

    login: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/login.html'));
    },

    registerSuccess: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/register-success.html'));
    }
}

module.exports= usersController;
