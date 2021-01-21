const {Sequelize,DataTypes} = require('sequelize');


module.exports = function(sequelize=new Sequelize()){
    
    const User = sequelize.define('user',{
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:true,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    return {model:User};
}
