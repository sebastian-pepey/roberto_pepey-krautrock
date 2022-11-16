module.exports = (sequelize,dataTypes) => {

    let alias = 'Product';

    let cols = {
        id : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },

        list_price : {
            type : dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull : false
        },

        quantity : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            allowNull : false
        },

        description : dataTypes.STRING(1000),

        sold : {
            type : dataTypes.BOOLEAN,
            allowNull : false
        },

        discount : dataTypes.BOOLEAN,

        used : {
            type : dataTypes.BOOLEAN,
            allowNull : false
        },

        id_category : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            allowNull : false
        },

        discount_amount : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            allowNull : false
        },

        free_shipment : {
            type : dataTypes.BOOLEAN,
            allowNull : false
        },

        payments : {
            type : dataTypes.BOOLEAN,
            allowNull: false
        }

    };

    const config = {
        tableName: 'products',
        timestamps: false
    };

    let Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.Category,
            {
                as : 'category',
                foreignKey : 'id_category'
            }
        );

        Product.belongsToMany(models.User,
            {
                as : 'user',
                through : 'products_users',
                foreignKey : 'id_product',
                otherKey : 'id_user',
                timestamps : false
            }
        );

        Product.hasMany(models.Image,
            {
                as : 'image',
                foreignKey : 'id_product'
            }
        );
    }

    return Product;
}