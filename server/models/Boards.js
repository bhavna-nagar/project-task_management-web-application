
module.exports=(sequelize,DataTypes)=>{
    const Boards=sequelize.define("Boards",{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        boardText:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    Boards.associate=(models)=>{
        Boards.hasMany(models.Todos,{
            onDelete:"cascade"
        });
        Boards.hasMany(models.Items,{
            onDelete:"cascade"
        });
    };

    return Boards;
};

