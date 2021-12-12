const Op = require("sequelize").Op;
const { User } = require("../models/index");

const db = require("../models/index");
exports.getUser = async (userId) => {
  return await User.findOne({
    attributes: ["id", "user_id", "email", "name", "nickname"],
    where: {
      id: userId,
    },
  });
};

exports.deleteUser = async (userId) => {
  return await User.destroy({
    where: {
      user_id: userId,
    },
  });
};
