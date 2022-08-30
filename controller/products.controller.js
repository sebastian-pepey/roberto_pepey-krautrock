const fs=require('fs');
const path=require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

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
			id:products[products.length-1].id+1,
			name:req.body.name,
			price:req.body.price,
            userId: 2,
            quantity: req.body.quantity,
			description:req.body.description,
			image: ['default-image.png','default-image.png','default-image.png','default-image.png','default-image.png'],
            sold: false,
			}
		)
		
		fs.writeFileSync(productsFilePath,JSON.stringify(products));

		res.redirect('/products');

    },

    showEditProduct: (req,res)=>{

        const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

        const productToShow=products.find(e=>e.id===parseInt(req.params.id));

        res.render('products/edit-product',{productToShow})
    },

    editProduct: (req,res)=>{

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
		const productToEdit=products.find(e=>e.id===parseInt(req.params.id))
		
		let indexProduct=products.indexOf(productToEdit);
		console.log(req.body.used)
		products[indexProduct].name=req.body.name;
		products[indexProduct].price=req.body.price;
		products[indexProduct].discount=req.body.discount;
		products[indexProduct].category=req.body.category;
        products[indexProduct].used=req.body.used==='true';
		products[indexProduct].description=req.body.description;
		
		fs.writeFileSync(productsFilePath,JSON.stringify(products));

		res.redirect('/products');


        res.redirect('/products')
    },

    deleteProduct: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const productFiltered=products.filter(e=>e.id!=parseInt(req.params.id));

		fs.writeFileSync(productsFilePath,JSON.stringify(productFiltered));

		res.redirect('/products');
    }

}

module.exports=productsController;