module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Cart", {
    cart_num: {
      type: DataTypes.INTEGER,
      alloNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    is_check: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, //기본적으로 false, ture일 경우 표시 x
    },
  });
};
