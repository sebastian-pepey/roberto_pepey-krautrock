const fs=require('fs');

const productsController={

    products: (req,res)=>{

        const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

        res.render('products/products',{products});

    },

    detail: (req,res)=>{

        const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

        const users=JSON.parse(fs.readFileSync('data/usersDataBase.json',{encoding:'utf-8'}));

        const productToShow=products.find(e=>e.id===parseInt(req.params.id));

        const userToShow=users.find(e=>e.id===productToShow.userId);

        res.render('products/detail',{productToShow,userToShow})
    },

    cart: (req,res)=>{

        const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

        const users=JSON.parse(fs.readFileSync('data/usersDataBase.json',{encoding:'utf-8'}));

        const productToShow=products.find(e=>e.id===parseInt(req.params.id));

        const userToShow=users.find(e=>e.id===productToShow.userId);

        res.render('products/cart',{productToShow,userToShow});
    },

    showForm: (req,res)=>{
        res.render('products/create-product');
    },

    createProduct: (req,res)=>{

        const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

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

        res.redirect('/products');
    },
}

module.exports=productsController;