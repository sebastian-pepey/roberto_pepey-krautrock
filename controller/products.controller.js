const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

function deleteFiles(array,dontErase,route){

    for(let i=0;i<array.length;i++){

        let fullRoute=path.join(__dirname,route,array[i].filename);

        if(array[i].filename!==dontErase){

            fs.stat(fullRoute,(err)=>{
                if(!err){
                    fs.unlinkSync(fullRoute);
                }
            }); 
        }
    }
}

const productsController = {

    products: (req, res) => {

        const products = JSON.parse(fs.readFileSync('data/productsDataBase.json', {encoding: 'utf-8'}));

        res.render('products/products', {products});

    },

    detail: (req, res) => {

        const products = JSON.parse(fs.readFileSync('data/productsDataBase.json', {encoding: 'utf-8'}));

        const users = JSON.parse(fs.readFileSync('data/usersDataBase.json', {encoding: 'utf-8'}));

        const productToShow = products.find(e => e.id === parseInt(req.params.id));

        const userToShow = users.find(e => e.id === productToShow.userId);

        res.render('products/detail', {productToShow, userToShow})
    },

    cart: (req, res) => {

        const products = JSON.parse(fs.readFileSync('data/productsDataBase.json', {encoding: 'utf-8'}));

        const users = JSON.parse(fs.readFileSync('data/usersDataBase.json', {encoding: 'utf-8'}));

        const productToShow = products.find(e => e.id === parseInt(req.params.id));

        const userToShow = users.find(e => e.id === productToShow.userId);

        res.render('products/cart', {productToShow, userToShow});
    },

    showForm: (req, res) => {
        res.render('products/create-product');
    },

    createProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync('data/productsDataBase.json', {encoding: 'utf-8'}));
        
        if(req.files.length===0){
            req.files.push({filename:"default-image.png"})
        }
        
        products.push({
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            origPrice: parseInt(req.body.orig_price),
            quantity: parseInt(req.body.quantity),
            description: req.body.description,
            discount:req.body.discount==="on",
            discountAmount:(req.body.discount==="on"?1:0)*parseInt(req.body.discount_amount),
            userId: 2,
            freeShipment:req.body.free_shipment==="on",
            payments:req.body.payments==="on",
            image: req.files,
            sold: false
        });
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products));

        res.redirect('/products');
    },

    showEditProduct: (req, res) => {

        const products = JSON.parse(fs.readFileSync('data/productsDataBase.json', {encoding: 'utf-8'}));

        const productToShow = products.find(e => e.id === parseInt(req.params.id));

        res.render('products/edit-product', {productToShow})
    },

    editProduct: (req, res) => {   

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productToEdit = products.find(e => e.id === parseInt(req.params.id))

        let indexProduct = products.indexOf(productToEdit);
        
        products[indexProduct].name = req.body.name;
        products[indexProduct].origPrice = parseInt(req.body.orig_price);
        products[indexProduct].quantity = parseInt(req.body.quantity);
        products[indexProduct].description = req.body.description;
        products[indexProduct].discount = req.body.discount==="on",
        products[indexProduct].discountAmount=(req.body.discount==="on"?1:0)*parseInt(req.body.discount_amount),
        products[indexProduct].freeShipment=req.body.free_shipment==="on";
        products[indexProduct].payments=req.body.payments==="on";

        if(req.files.length!==0){
            deleteFiles(products[indexProduct].image,'default-image.png','./../public/img/');

            products[indexProduct].image=req.files;
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(products));

        res.redirect('/products');
    },

    deleteProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const product=products.find(e=>e.id==parseInt(req.params.id));

        deleteFiles(product.image,'default-image.png','./../public/img/');

        const productFiltered = products.filter(e => e.id != parseInt(req.params.id));

        fs.writeFileSync(productsFilePath, JSON.stringify(productFiltered, null, ' '));

        res.redirect('/products');
    }

}

module.exports = productsController;
