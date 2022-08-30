const fs=require('fs');

const products=JSON.parse(fs.readFileSync('data/productsDataBase.json',{encoding:'utf-8'}));

const mainController={

    main: (req,res)=>{
        res.render('main/main',{products});
    },

}

module.exports=mainController;