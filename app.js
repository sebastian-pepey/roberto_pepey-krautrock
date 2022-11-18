const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const methodOverride=require('method-override');

const mainRoutes=require('./routes/main.routes');
const productsRoutes=require('./routes/products.routes');
const usersRoutes=require('./routes/users.routes');
const apiProductsRoutes = require('./routes/apis/products.routes');
const apiUsersRoutes = require('./routes/apis/products.routes');


const session=require('express-session');
const cookieParser = require('cookie-parser');
const rememberUser=require('./middlewares/rememberUser.middleware');
const db = require('./database/models');

//MIDDLEWARE

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({extended:false}))

app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({
    secret:'krautrock',
    resave:false,
    saveUninitialized:false,
}));

app.use(cookieParser());

app.use(rememberUser);

app.use(cors());

//RUTAS

app.use('/',mainRoutes);

app.use('/products',productsRoutes);

app.use('/users',usersRoutes);

app.use('/api/v1/products',apiProductsRoutes);
app.use('/api/v1/users',apiUsersRoutes);

app.use(async (req,res,next)=>{

    let categories = await db.Category.findAll();

    res.status(404).render('main/error',{categories});
})

app.set('view engine','ejs');

app.set('port',process.env.PORT || 3001);

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo de manera satisfactoria en puerto ${app.get('port')}`)
});