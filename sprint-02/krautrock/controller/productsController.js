const path=require('path');

const productsController={

    product: (req,res)=>{
        res.sendFile(path.join(__dirname,'../views/product.html'));
    },

}

module.exports=productsController;