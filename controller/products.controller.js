const fs=require('fs');

const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

const productsController={

    index: (req,res)=>{

        res.render('products/index',{products});

    },

    product: (req,res)=>{

        const productToShow=products.find(e=>e.id===parseInt(req.params.id))

        res.render('products/product',{productToShow})
    },

    cart: (req,res)=>{
        res.render('products/cart');
    },

    createProduct: (req,res)=>{
        res.render('products/create-product');
    },

    createNewProduct: (req,res)=>{
        products.push(
            {
                id:1,
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                image:[].push(req.body.image),
            }
        );

        fs.writeFileSync('./data/productsDataBase.json',JSON.stringify(products));

        res.redirect('/');
    },
}

module.exports=productsController;