const Op = require("sequelize").Op;

const { Diary, sequelize } = require("../models");

exports.getDiary = async (userId) => {
  return await Diary.findAll({
    attributes: ["title", "content"],
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
exports.deleteDiary = async (num) => {
  return await Diary.destroy({
    where: {
      id: num,
    },
  });
};
