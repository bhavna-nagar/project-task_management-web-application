module.exports=(sequelize,DataTypes)=>{
    const Events=sequelize.define("Events",{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        start:{
            type:DataTypes.STRING,
            allowNull:false
        },
        end:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    return Events;
};
