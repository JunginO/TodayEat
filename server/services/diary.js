const Op = require("sequelize").Op;

const { Diary, sequelize } = require("../models");

exports.getDiary = async (userId) => {
  return await Diary.findAll({
    attributes: ["id", "title", "content"],
    where: {
      user_id: userId,
    },
    order: [["created_at", "DESC"]],
  });
};

exports.createDiary = async (userId, title, content) => {
  return await Diary.create({
    user_id: userId,
    content: content,
    title: title,
  });
};
exports.deleteDiary = async (id) => {
  return await Diary.destroy({
    where: {
      id: id,
    },
  });
};
