const path=require('path');

const usersController={

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
