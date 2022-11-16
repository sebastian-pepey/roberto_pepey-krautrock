module.exports = (sequelize,dataTypes) => {
    
    let alias = 'ProductUser';

    let cols = {
        id : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        id_product : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            allowNull : false
        },

        id_user : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            allowNull : false
        },

    };

    const config = {
        tableName: 'products_users',
        timestamps: false
    };
    
    let ProductUser = sequelize.define(alias,cols,config);

    ProductUser.associate = function(models){
        ProductUser.belongsTo(models.Product,
            {
                as : 'product',
                foreignKey : 'id_product'
            }
        );

        ProductUser.belongsTo(models.User,
            {
                as : 'user',
                foreignKey : 'id_user'
            }
        );
    }

    return ProductUser;
}