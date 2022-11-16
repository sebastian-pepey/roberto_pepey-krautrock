module.exports = (sequelize,dataTypes) => {
    
    let alias = 'Image';

    let cols = {
        id : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        name : {
            type : dataTypes.STRING(50),
            allowNull : false
        },

        id_product : {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull : false
        }
    };

    const config = {
        tableName: 'product_images',
        timestamps: false
    };
    
    let Image = sequelize.define(alias,cols,config);

    Image.associate = function(models){
        Image.belongsTo(models.Product,
            {
                as : 'product',
                foreignKey : 'id_product'
            }
        );
    }

    return Image;
}