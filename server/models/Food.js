module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Food",
        {
            food_num: {
                type: DataTypes.INTEGER,
                alloNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            category: {
                type: DataTypes.STRING(20),
                alloNull: false,
            },
            food_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_weather: {
                type: DataTypes.INTEGER,
            }                      
        },
        
    );
};