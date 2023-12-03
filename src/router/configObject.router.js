const Router = require("koa-router");
const configObjectRouter = new Router();

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  createObject,
  createPublicObject,
  getObject,
  getPublic,
  deleteObject,
  deletePublicObject,
  editPublicObject,
  editObject,
  editPublicCopy,
} = require("../controller/configObject.controller");

configObjectRouter.get("/getObj/:uid", verifyAuth, getObject);
configObjectRouter.post("/createObj/:str", verifyAuth, createObject);

configObjectRouter.get("/getPublic", verifyAuth, getPublic);
configObjectRouter.post(
  "/createPublicObj/:str",
  verifyAuth,
  createPublicObject
);

configObjectRouter.post("/deleteObj/:id", verifyAuth, deleteObject);
configObjectRouter.post("/deletePulicObj/:id", verifyAuth, deletePublicObject);

configObjectRouter.post("/editPublic", verifyAuth, editPublicObject);
configObjectRouter.post("/editPublicCopy", verifyAuth, editPublicCopy);
configObjectRouter.post("/editObject", verifyAuth, editObject);

module.exports = configObjectRouter;
