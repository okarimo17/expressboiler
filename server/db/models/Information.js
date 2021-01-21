const {Sequelize,DataTypes} = require('sequelize');

module.exports = function(sequelize=new Sequelize()){
    
    const Information = sequelize.define('information',{
       content:{
           type:DataTypes.JSON,
           allowNull:false
       }
    });

    return {model:Information};
}
