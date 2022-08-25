const usersController={

    register: (req,res)=>{
        res.render('users/register');
    },

    login: (req,res)=>{
        res.render('users/login');
    },

    registerSuccess: (req,res)=>{
        res.render('users/register-success');
    }
}

module.exports= usersController;
