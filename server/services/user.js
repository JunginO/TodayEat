const Op = require("sequelize").Op;
const { User } = require("../models/index");
exports.getUser = async (userId) => {
  return await User.findOne({
    attributes: ["user_id", "email", "name", "nickname"],
    where: {
      id: userId,
    },
  });
};

exports.updateUser = async (userId, nickname) => {
  return await User.update(
    {
      nickname,
    },
    {
      where: {
        id: userId,
      },
    }
  );
};

exports.deleteUser = async (userId) => {
  return await User.destroy({
    where: {
      id: userId,
    },
  });
};
