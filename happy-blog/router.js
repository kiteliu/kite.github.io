"use strict";

const express = require('express');

const router = express.Router();

const indexController = require('./controllers/index');
const userController = require('./controllers/user');
const articleController = require('./controllers/article');

router.get('/', indexController.showIndex);
router.get('/register', userController.showRegister);
router.post('/register', userController.doRegister);
router.get('/login', userController.showLogin);
router.post('/login', userController.doLogin);
router.get('/logout', userController.doLogout);
router.get('/captcha', userController.getCaptcha);
router.get('/publish/article',articleController.showPublish);
router.post('/publish/article',articleController.doPublish);
router.get('/article/:articleId',articleController.showArticle);
router.post('/article/upload',articleController.uploadImage);

module.exports = router;
