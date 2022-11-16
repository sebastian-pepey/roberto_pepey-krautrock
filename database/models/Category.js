module.exports = (sequelize,dataTypes) => {
    
    let alias = 'Category';

    let cols = {
        id : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        name : {
            type: dataTypes.STRING(60),
            allowNull : false
        }
    };

    const config = {
        tableName : 'category',
        timestamps : false
    };
    
    let Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Product,
            {
                as : 'category_product',
                foreignKey : 'id_category'
            }
        );
    }

    return Category;
}