const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error.type");
const userService = require("../service/user.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");

const verifyLogin = async (ctx, next) => {
  //获取用户信息
  const { name, password } = ctx.request.body;
  //1.判断用户名和密码是否为空
  if (!name || !password) {
    const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", err, ctx);
  }

  //2.判断用户名是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const err = new Error(errorTypes.USERNAME_DOSE_NOT_EXISTS);
    return ctx.app.emit("error 用户名不存在，请先注册", err, ctx);
  }
  //3.判断密码是否和数据库中一致(加密后)
  if (md5password(password) != user.password) {
    const err = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error 密码不对", err, ctx);
  }
  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  //1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const err = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  //2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (error) {
    const err = new Error(errorTypes.UNAUTHORIZATION);
    console.log(error);
    ctx.app.emit("error", err, ctx);
  }
};

module.exports = { verifyLogin, verifyAuth };
