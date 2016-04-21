"use strict";

const ccap = require('ccap');
const User = require('../models/user');
const utility = require('utility');

exports.showRegister = function (req, res, next) {

  // 权限校验，已经登录的用户，就不要再访问这个页面了，直接跳转到首页就行了
  if (req.session.user) {
    return res.redirect('/');
  }

  res.render('register');
};


// POST username password email vcode
exports.doRegister = function (req, res, next) {

  // 第一步：接收用户通过表单输入的数据
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let vcode = req.body.vcode;

  let session_vcode = req.session.vcode;


  // 第二步：对用户提交的数据进行普通的数据校验
  // 拿着用户提交的数据做具体的业务处理

  // 校验用户输入的数据是否符合规则
  // 用户名是否是6-12位的非中文、不能有特殊字符，只能是字母、数字
  // 密码必须是6-18为 字母、数字、下划线
  // email 必须符合邮箱规则

  // 校验验证码是否正确
  if (session_vcode.toLowerCase() !== vcode.toLowerCase()) {
    return res.json({
      code: '0',
      msg: '验证码不正确'
    });
  }


  // 第三步：执行具体的业务逻辑校验，如果用户名已存在，那么就响应给客户端：用户名已存在,如果不存在，可以注册了
  // 校验用户名是否存在
  User.getByUsername(username, function (err, result) {
    if (err) {
      return next(err);
    }
    // 如果存在，告诉用户用户名已经存在了 SELECT
    if (result) {
      return res.json({
        code: '0',
        msg: '用户名已存在'
      });
    }

    password = `${utility.md5(utility.md5(password+req.app.locals.config.secret))}`;

    let user = new User({
      username,
      password,
      email
    });

    user.save(function (err, result) {
      if (err) {
        return next(err);
      }
      let uid = result.insertId;
      if (uid == 0) {
        return res.json({
          code: '0',
          msg: 'failed'
        });
      }

      user.id = uid;

      // 代码执行到这里，表示用户注册成功了，所以要记录用户登录成功的状态
      req.session.user = user;

      res.json({
        code: '1',
        msg: 'success'
      });
    });
  });
};

exports.showLogin = function (req, res, next) {
  res.render('login');
};

// POST username password
exports.doLogin = function (req, res, next) {
  // 1. 接收用户提交的数据
  let username = req.body.username.trim();
  let password = req.body.password.trim();

  // 2. 基本的数据校验
  // 是否为空

  // 3. 具体的业务逻辑校验
  // 3.1 该用户是否存在

  // 先根据用户名把用户记录查询出来，如果没有，表示该用户不存在，结束响应
  // 3.2 校验密码是否正确，如果正确，写入Session，跳转到首页
  User.getByUsername(username, function (err, result) {
    if (!result) {
      return res.json({
        code: '0',
        msg: '该用户不存在'
      });
    }

    password = `${utility.md5(utility.md5(password+req.app.locals.config.secret))}`;

    if (password !== result.password) {
      return res.json({
        code: '0',
        msg: '密码错误'
      });
    }

    // 写入Session
    req.session.user = result;

    // 跳转到首页
    res.json({
      code: '1',
      msg: 'success'
    });
  });


};

// 当每一次来请求这个验证码的处理函数的时候，都会动态的生成一张验证码图片，响应给客户端
exports.getCaptcha = function (req, res, next) {

  let ary = ccap().get();

  let txt = ary[0];

  let buf = ary[1];

  req.session.vcode = txt;

  res.end(buf);

};

exports.doLogout = function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
};
