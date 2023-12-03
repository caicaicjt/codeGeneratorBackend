const configObjectService = require("../service/configObject.service");

class ConfigObjectController {
  async createObject(ctx, next) {
    const { str } = ctx.params;
    const arr = str.split("&");
    let name = arr[0];
    let uid = arr[1];
    const { content, description } = ctx.request.body;
    const result = await configObjectService.createObject(
      name,
      JSON.stringify(content),
      uid,
      description
    );
    ctx.body = result;
  }
  async createPublicObject(ctx, next) {
    const { str } = ctx.params;
    const arr = str.split("&");
    let name = arr[0];
    let uid = arr[1];
    const { content, owner, description } = ctx.request.body;
    const result = await configObjectService.createPublicObject(
      name,
      JSON.stringify(content),
      uid,
      owner,
      description
    );
    ctx.body = "创建成功";
  }
  async getObject(ctx, next) {
    const { uid } = ctx.params;
    const result = await configObjectService.getObject(uid);
    ctx.body = result;
  }
  async getPublic(ctx, next) {
    const result = await configObjectService.getPublic();
    ctx.body = result;
  }
  async deleteObject(ctx, next) {
    const { id } = ctx.params;
    const result = await configObjectService.deleteObject(id);
    ctx.body = result;
  }
  async deletePublicObject(ctx, next) {
    const { id } = ctx.params;
    const result = await configObjectService.deletePublicObject(id);
    ctx.body = result;
  }
  async editPublicObject(ctx, next) {
    const { id, obj, objName, description } = ctx.request.body;
    console.log(id, obj, objName, description);
    const result = await configObjectService.editPublicObject(
      id,
      obj,
      objName,
      description
    );
    ctx.body = result;
  }
  async editPublicCopy(ctx, next) {
    const { id, count } = ctx.request.body;
    const result = await configObjectService.editPublicCopy(id, count);
    ctx.body = result;
  }
  async editObject(ctx, next) {
    const { id, obj, objName, description } = ctx.request.body;
    console.log(id, obj, objName, description);
    const result = await configObjectService.editObject(
      id,
      obj,
      objName,
      description
    );
    ctx.body = result;
  }
}

module.exports = new ConfigObjectController();
