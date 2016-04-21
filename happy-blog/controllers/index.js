"use strict";

exports.showIndex = function (req, res, next) {
  res.render('index',{
    user:req.session.user
  });
};
