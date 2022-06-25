module.exports=(sequelize,DataTypes)=>{
    const Items=sequelize.define("Items",{
        itemTitle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        itemText:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    return Items;
};