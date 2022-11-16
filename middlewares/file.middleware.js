const multer=require('multer');
const path=require('path');
let destPath,fileName;

let multerDiskStorage=multer.diskStorage({

    destination:(req,file,cb)=>{
        if (req.route.path === '/register'){
                destPath='../public/img/users';
                fileName='users_';
        } else {
            destPath='../public/img/products';
            fileName='products_';
        }

        let folder=path.join(__dirname,destPath);
        cb(null,folder);
    },

    filename:(req,file,cb)=>{
        let imageName=fileName+Date.now()+path.extname(file.originalname);
        cb(null,imageName);
    }
})

let fileUpload=multer({storage:multerDiskStorage});

module.exports=fileUpload;