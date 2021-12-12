const Op = require("sequelize").Op;
const { Food } = require("../models/index");
const db = require("../models/index");
exports.getFood = async (WCode) => {
  return await Food.findAll({
    where: {
      is_weather: WCode,
    },
    order: db.sequelize.random(),
    limit: 4,
  });
};

exports.getSelectedFood = async (category) => {
  return await Food.findAll({
    where: {
      category: category,
    },
    order: [["createdAt", "DESC"]],
  });
};

exports.createNewFood = async (food, category) => {
  return await Food.create({
    food_name: food,
    category: category,
  });
};
exports.deleteFood = async (food) => {
  return await Food.destroy({
    where: {
      food_name: food,
    },
  });
};
