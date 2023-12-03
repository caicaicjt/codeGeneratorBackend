const Router = require("koa-router");
const userRouter = new Router();

const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { edit } = require("../controller/user.controller");

userRouter.post("/edit", verifyAuth, verifyUser, handlePassword, edit);

module.exports = userRouter;
