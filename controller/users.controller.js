const fs=require('fs');

const usersController={

    register: (req,res)=>{
        res.render('users/register');
    },

    login: (req,res)=>{
        res.render('users/login');
    },
    
    save: (req,res)=>{
        res.send(req.body);

        const users=JSON.parse(fs.readFileSync('data/usersDataBase.json',{encoding:'utf-8'}));
    }
}

module.exports= usersController;
