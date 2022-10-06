const fs=require('fs');

const mainController={

    main: (req,res)=>{

        const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

        res.render('main/main',{products,user:req.session.userLogged});

    },

}

module.exports=mainController;