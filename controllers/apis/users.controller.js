const location = require('../data/location.json');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const {validationResult} = require('express-validator');

const usersController = {

    // CREATE

    register: async (req, res) => {

        let categories = await db.Category.findAll()

        res.render('users/register', {location, user:req.session.userLogged, categories});
    },

    save: async (req, res) => {

        let categories = await db.Category.findAll();

        const error = validationResult(req);

        if (! error.isEmpty()) {

            const oldData = req.body;

            res.render('users/register', {
                errorMessages: error.mapped(),
                oldData,
                location,
                user:req.session.userLogged,
                categories
            })

        } else {
            let result = await db.User.findOne({ where: {email: req.body.email}});

            if(result !== null ){

                const oldData = req.body;
    
                res.render('users/register', {
                    errorMessages: {email: {msg: 'Este usuario ya se encuentra registrado'}},
                    oldData,
                    location,
                    user:req.session.userLogged,
                    categories
                });
    
                } else {

                    let userToSave = {
                        name: req.body.userName,
                        fullname: req.body.fullName,
                        birth_date: req.body.birthDate,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        phone: req.body.phone,
                        avatar: req.file !== undefined ? req.file.filename : 'default_avatar.jpg',
                        address: req.body.address,
                        location: req.body.location,
                        rating: 0
                    }
        
                db.User.create(userToSave)
                .then(
                    res.render('users/register-success', {user:req.session.userLogged, categories})
                );            
            }
        }
    },

    // READ

    formLogin: async (req, res) => {

        let categories = await db.Category.findAll();

        res.render('users/login', {categories});
    },

    login: async (req, res) => {

        let categories = await db.Category.findAll();

        const loggedUser = await db.User.findOne({ where: {
                name: req.body.userName
            }
        });

        if (loggedUser !== null && bcrypt.compareSync(req.body.password, loggedUser.password) === true) {

            delete loggedUser.password;

            req.session.userLogged=loggedUser;

            if(req.body.remain_connected){
                
                res.cookie('remUser',loggedUser.id,{maxAge:1000*60*30})
            }

            res.redirect('/users/profile');

        } else {
            res.render('users/user-error',{categories});
        }
    },

    profile: async (req, res) => {

        let categories = await db.Category.findAll();

        let products = await db.Product.findAll({

            include: [
                {
                    association : 'image'
                }, {
                    association : 'user'
                }
            ],
            where : {
                '$user.id$' : req.session.userLogged.id 
            }
        });

        res.render('users/userProfile',{user:req.session.userLogged,products, categories});
    },

    //DELETE

    deleteUser:{

    },

    logout:(req, res) => {

        req.session.destroy();

        res.redirect('/');
    }
    
}

module.exports = usersController;
