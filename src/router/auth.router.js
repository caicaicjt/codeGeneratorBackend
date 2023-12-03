const Router = require("koa-router");
const authRouter = new Router();
const { login } = require("../controller/auth.controller");
const { verifyLogin } = require("../middleware/auth.middleware");
const { create } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
authRouter.post("/login", verifyLogin, login);
authRouter.post("/logon", verifyUser, handlePassword, create);

module.exports = authRouter;
