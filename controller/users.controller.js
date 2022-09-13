const fs=require('fs');
const path=require('path');
const {validationResult}=require('express-validator');
const location=require('./../data/location.json');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const fileUpload=require('./../middleware/file.middleware');

const usersController={

    register: (req,res)=>{
        res.render('users/register',{location});
    },

    formLogin: (req,res)=>{
        res.render('users/login');
    },
    
    save: (req,res)=>{

        let errors=validationResult(req);

        if(!errors.isEmpty()){

            return res.render('users/register',{errorMessages: errors.array()})
            
        }

        // const users=JSON.parse(fs.readFileSync(usersFilePath,{encoding:'utf-8'}));

        // users.push(
		// 	{		
		// 	id:users[users.length-1].id+1,
		// 	name:req.body.name,
		// 	birthDate:req.body.birthDate,
        //     userName:req.body.userName,
        //     email: req.body.email,
        //     password: req.body.password,
		// 	phone:req.body.phone,
		// 	avatar:req.body.avatar,
        //     location:req.body.location,
        //     country:req.body.country,
        //     rating:0
		// 	}
        // )
		
		// fs.writeFileSync(usersFilePath,JSON.stringify(users));

		res.render('users/register-success');
    },

    login:(req,res)=>{

        const users=JSON.parse(fs.readFileSync(usersFilePath,{encoding:'utf-8'}));

        const loggedUser=users.find(e=>e.userName===req.body.userName);

        if(loggedUser!=undefined && loggedUser.password[0]===req.body.password){

            res.redirect('/');

            }else{
                res.render("users/user-error");
            }


        
    }
}

module.exports= usersController;
