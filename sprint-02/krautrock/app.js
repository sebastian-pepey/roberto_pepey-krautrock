const express = require('express');
const path = require('path');
const app = express();

const productsRouter=require(path.join(__dirname,"/routes/products.routes"));

const usersRouter=require(path.join(__dirname,"/routes/users.routes"));

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "/public")))

app.set('view engine','ejs');

app.set('puerto',process.env.PORT || 3000);

//RUTAS
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/index.html'));
// });

// app.get('/register',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/register.html'));
// });

// app.get('/login',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/login.html'));
// });

// app.get('/product',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/product.html'));
// });

// app.get('/clases',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/clases.html'));
// });

// app.post('/register',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/register-success.html'));
// });

// app.post('/login',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/index.html'));
// });

app.use('/',productsRouter);

app.use('/',usersRouter);

app.listen(app.get('puerto'), () => {
    console.log(`Servidor corriendo de manera satisfactoria en puerto ${app.get('puerto')}`)
});