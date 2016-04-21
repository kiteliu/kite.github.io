"use strict";

const Article = require('../models/article');
const moment = require('moment');
const md = require('markdown-it')();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


exports.showPublish = function (req, res, next) {

  // 如果用户没有登录，直接跳转到首页
  if (!req.session.user) {
    return res.redirect('/');
  }

  res.render('publish', {
    user: req.session.user
  });
};

exports.doPublish = function (req, res, next) {
  // 第一步：接收用户提交的数据
  let title = req.body.title;
  let content = req.body.content;
  let time = moment().format('YYYY-MM-DD HH:mm:ss');
  let uid = req.session.user.id;

  // 第二步：基本的数据校验

  // 第三步：业务逻辑处理

  let article = new Article({
    title,
    content,
    time,
    uid
  });

  article.save(function (err, result) {
    if (err) {
      return next(err);
    }
    let insertId = result.insertId;
    if (insertId <= 0) {
      return res.json({
        code: '0',
        msg: 'failed'
      });
    }

    res.json({
      code: '1',
      msg: insertId
    });
  });
};

exports.showArticle = function (req, res, next) {

  // 接收用户提交的数据
  let articleId = req.params.articleId;

  // 拿着文章的id去数据库查询
  Article.getById(articleId, function (err, article) {
    if (err) {
      return next(err);
    }

    // article.content
    article.content = md.render(article.content);

    res.render('article', {
      article: article,
      user: req.session.user
    });
  });
};

exports.uploadImage = function (req, res, next) {
  var form = new formidable.IncomingForm();
  //form.uploadDir = "./uploads"; // 指定 formidable 先帮我们把文件解析到该目录下
  form.uploadDir = req.app.locals.config.uploadDir; // 最好把这中可能发生变化的放到配置文件中
  form.parse(req, function (err, fields, files) {

    if (err) {
      return res.json({
        code: '0',
        msg: 'failed'
      });
    }

    let pic = files.pic;
    let tmpPath = pic.path;
    let size = pic.size;
    let name = pic.name;

    let newPath = tmpPath + path.extname(name);

    fs.rename(tmpPath, newPath, function () {
      // 将该图片的请求路径响应给客户端就行了

      // /uploads/path.basename(newPath)

      res.json({
        code: '1',
        msg: `/uploads/${path.basename(newPath)}`
      });

    });

  });
};
