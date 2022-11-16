module.exports = (sequelize,dataTypes) => {
    
    let alias = 'User';

    let cols = {
        id : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        name : {
            type : dataTypes.STRING(50),
            allowNull: false
        },

        fullname : {
            type : dataTypes.STRING(50),
            allowNull : false
        },

        birth_date : dataTypes.DATE,

        email : {
            type : dataTypes.STRING(45),
            allowNull : false
        },

        password : {
            type : dataTypes.STRING(60),
            allowNull : false
        },
        
        phone : dataTypes.BIGINT(14),

        avatar : dataTypes.STRING(45),

        address : dataTypes.STRING(100),

        location : dataTypes.STRING(45),

        rating : dataTypes.DECIMAL(3,1).UNSIGNED,
    };

    const config = {
        tableName : 'users',
        timestamps : false
    };
    
    let User = sequelize.define(alias,cols,config);

    User.associate = function(models){

        User.belongsToMany(models.Product,
            {
                as : 'product',
                through : 'products_users',
                foreignKey : 'id_user',
                otherKey : 'id_product',
                timestamps : false
            }
        )
    }

    return User;
}