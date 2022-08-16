// const express =require('express');
// const path = require('path');

// const app=express();

// app.listen(3000,()=>{console.log('servidor corriendo')});

// app.use(express.static(path.join(__dirname,'/public')));

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/index.html'));
// });

// app.get('/register',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/register.html'));
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

const express = require('express');
const path = require('path');
const app = express();

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "/public")))

app.set('puerto',process.env.PORT || 3000);

//RUTAS
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/index.html'));
});

app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/register.html'));
});

app.get('/product',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/product.html'));
});

app.get('/clases',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/clases.html'));
});

app.post('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/register-success.html'));
});

app.listen(app.get('puerto'), () => {
    console.log(`Servidor corriendo de manera satisfactoria en puerto ${app.get('puerto')}`)
});