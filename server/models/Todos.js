module.exports=(sequelize,DataTypes)=>{
    const Todos=sequelize.define("Todos",{
        listTitle:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
    Todos.associate=(models)=>{
        Todos.hasMany(models.Items,{
            onDelete:"cascade"
        });
    };
    return Todos;
};