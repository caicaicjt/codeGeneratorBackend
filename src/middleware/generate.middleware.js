var template = require("art-template");

const codeGenerate = async (ctx, next) => {
  //获取配置对象
  const obj = ctx.request.body;
  console.log(obj);
  //使用ART-Template进行模板生成
  var html = template(__dirname + "/../template/target.art", obj);
  console.log("html", html);
  //对结果代码进行处理
  html = (html + "").replace(/&lt;br&gt;/g, "");
  //返回结果
  ctx.html = html;
  await next();
};

module.exports = { codeGenerate };
