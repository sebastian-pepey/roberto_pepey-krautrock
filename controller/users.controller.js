const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const fileUpload = require('./../middleware/file.middleware');
const location = require('./../data/location.json');
const bcrypt = require('bcryptjs');
const User=require('./../models/User');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const usersController = {

    // CREATE

    register: (req, res) => {
        res.render('users/register', {location, user:req.session.userLogged});
    },

    save: (req, res) => {

        const error = validationResult(req);

        if (! error.isEmpty()) {

            const oldData = req.body;

            res.render('users/register', {
                errorMessages: error.mapped(),
                oldData,
                location,
                user:req.session.userLogged
            })

        } else if(User.findByField('email',req.body.email)!==undefined){

            const oldData = req.body;

            res.render('users/register', {
                errorMessages: {email: {msg: 'Este usuario ya se encuentra registrado'}},
                oldData,
                location,
                user:req.session.userLogged
            });

        }else{
            let userToSave = {
                name: req.body.fullName,
                birthDate: req.body.birthDate,
                userName: req.body.userName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                location: req.body.location,
                avatar: req.file !== undefined ? req.file.filename : 'default_avatar.jpg',
                password: bcrypt.hashSync(req.body.password, 10),
                rating: 0
            }

            User.create(userToSave);
            res.render('users/register-success', {user:req.session.userLogged});

        }
    },

    // READ

    formLogin: (req, res) => {
        res.render('users/login');
    },

    login: (req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, {encoding: 'utf-8'}));

        const loggedUser = users.find(e => e.userName === req.body.userName);

        if (loggedUser != undefined && bcrypt.compareSync(req.body.password, loggedUser.password) === true) {

            delete loggedUser.password;

            req.session.userLogged=loggedUser;

            res.redirect('/');

        } else {
            res.render('users/user-error');
        }
    },

    profile: (req, res) => {

        const allProducts=JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));

        const userProducts=allProducts.filter(e=>e.userId===req.session.userLogged.id);

        res.render('users/userProfile',{user:req.session.userLogged,products:userProducts});
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
