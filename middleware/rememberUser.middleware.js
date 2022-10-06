const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

function rememberUser(req,res,next){

    if(req.cookies.remUser!==undefined && req.session.userLogged === undefined){

        const users = JSON.parse(fs.readFileSync(usersFilePath, {encoding: 'utf-8'}));

        const loggedUser = users.find(e => e.id === req.cookies.remUser.id);

        req.session.userLogged=loggedUser;

    }

    next()
}

module.exports = rememberUser;