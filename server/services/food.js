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
  });
};

exports.createNewFood = async (food, content) => {
  return await Diary.create({
    food_name: food,
    content: content,
  });
};
