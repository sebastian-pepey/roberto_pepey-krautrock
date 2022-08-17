const path=require('path');

const productsController={

    product: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/product.html'));
    },

    cart: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/cart.html'));
    },
}

module.exports=productsController;