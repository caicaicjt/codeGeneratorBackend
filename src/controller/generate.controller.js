class GenerateController {
  async generate(ctx, next) {
    let html = ctx.html;
    ctx.body = html;
  }
}

module.exports = new GenerateController();
