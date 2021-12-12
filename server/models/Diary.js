module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Diary",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "제목없음",
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "내용없음",
      },
      user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: true, underscored: true }
  );
};
