# 项目笔记

## Session 状态保持

### 在Express中使用Session中间件：
```npm install --save express-session```

### 验证码

- 动态改变图片的src属性，为了防止请求url缓存
  + 在请求的url后面加一个时间戳
  + 或者在请求的url后面加一个随机数
  + 目的是为了告诉浏览器，我每一个都是一个新的不同的请求


