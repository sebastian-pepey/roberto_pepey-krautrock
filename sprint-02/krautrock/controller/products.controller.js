const path=require('path');

const products=require('../data/productsDataBase.json')

const productsController={

    index: (req,res)=>{
        res.render('index',{products});
    },

    product: (req,res)=>{
        const productToShow=products.find(e=>e.id===parseInt(req.params.id))

        res.render('product',{productToShow})
    },

    cart: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/cart.html'));
    },
}

module.exports=productsController;