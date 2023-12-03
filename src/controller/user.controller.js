const fs = require("fs");

const service = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    //获取用户请求传递过来的参数
    const user = ctx.request.body;
    //查询数据
    const result = await service.create(user);
    //返回数据
    ctx.body = "注册成功！";
  }
  async edit(ctx, next) {
    //获取用户请求传递过来的参数
    const { id, name, password } = ctx.request.body;
    console.log(id, name, password);
    //查询数据
    const result = await service.editUserInfo(name, password, id);
    //返回数据
    console.log("修改成功");
    ctx.body = "修改成功！";
  }
}

module.exports = new UserController();
