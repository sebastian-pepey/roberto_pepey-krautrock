const db = require('../database/models');

const mainController={

    main: async (req,res)=>{

        let categories = await db.Category.findAll()
        
        let products = await db.Product.findAll({
            include : {
                association : 'image',
                required : true
            }
        });

        res.render('main/main',{products,user:req.session.userLogged,categories});

    },

}

module.exports=mainController;