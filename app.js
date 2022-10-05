const express = require('express');
const path = require('path');
const app = express();
const methodOverride=require('method-override');
const mainRouter=require(path.join(__dirname,"/routes/main.routes"));
const productsRouter=require(path.join(__dirname,"/routes/products.routes"));
const usersRouter=require(path.join(__dirname,"/routes/users.routes"));
const session=require('express-session');

//MIDDLEWARE

app.use(express.static(path.join(__dirname, "/public")))

app.use(express.urlencoded({extended:false}))

app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({
    secret:'krautrock',
    resave:false,
    saveUninitialized:false,
}));

//RUTAS
app.use('/',mainRouter);

app.use('/products',productsRouter);

app.use('/users',usersRouter);

app.use((req,res,next)=>{res.status(404).render('main/error')})


app.set('view engine','ejs');

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo de manera satisfactoria en puerto ${app.get('port')}`)
});