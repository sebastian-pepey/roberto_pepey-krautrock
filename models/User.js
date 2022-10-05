// 1. Guardar al usuario en la DB ✔
// 2. Buscar al usuario que se quiere loguear por su email ✔
// 3. Buscar a un usuario por su ID ✔
// 4. Editar la información de un usuario
// 5. Eliminar a un usuario de la DB ✔

const fs=require('fs');
const path=require('path');

const User = {
    fileName: path.join(__dirname, '../data/usersDataBase.json'),

    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName,{encoding:'utf-8'}));
    },

    findAll: function(){
        return this.getData();
    },

    findByPk:function(id){
        return this.findAll().find(e=>e.id===id);
    },

    findByField(field,value){
        return this.findAll().find(e=>e[field]===value);
    },

    generateId:function(){
        return this.getData().pop()!==undefined?this.getData().pop().id+1:1;
    },        

    create: function (userData){

        let usersFile=this.getData();
        usersFile.push(
			{		
			id: this.generateId(),
			...userData
			}
        )
		
		fs.writeFileSync(this.fileName,JSON.stringify(usersFile, null, ' '));

        return true;
    },

    delete:function(id){
        fs.writeFileSync(this.fileName,JSON.stringify(this.getData().filter(e => e.id != parseInt(id)), null, ' '));
        
        return true;
    }
}

module.exports=User;

