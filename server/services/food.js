const Op = require("sequelize").Op;

exports.getFood = async (weather) => {
  return await Food.findAll({
    where: {
      is_weather: weather,
    },
    order: sequelize.random(),
    limit: 4,
  });
};
