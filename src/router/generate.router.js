const Router = require("koa-router");
const generateRouter = new Router();

const { generate } = require("../controller/generate.controller.js");
const { codeGenerate } = require("../middleware/generate.middleware.js");
const { verifyAuth } = require("../middleware/auth.middleware");

generateRouter.post("/generate", verifyAuth, codeGenerate, generate);

module.exports = generateRouter;
