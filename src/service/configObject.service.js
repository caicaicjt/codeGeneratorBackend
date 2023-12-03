const connection = require("../app/database");

class UserService {
  async createObject(name, content, uid, description) {
    const statement = `INSERT INTO userInfo (objName,obj,uid,description) VALUES (?,?,?,?)`;
    const result = await connection.execute(statement, [
      name,
      content,
      uid,
      description,
    ]);
    return result[0];
  }
  async createPublicObject(name, content, uid, ovner, description) {
    console.log("content", content);
    const statement = `INSERT INTO publicobject (objName,obj,uid,owner,description,count) VALUES (?,?,?,?,?,?)`;
    const result = await connection.execute(statement, [
      name,
      content,
      uid,
      ovner,
      description,
      0,
    ]);
    return result[0];
  }
  async getObject(uid) {
    const statement = `
    SELECT u.id,u.objName,u.obj,u.uid,u.description
    FROM userInfo u 
    WHERE uid=?`;
    const [result] = await connection.execute(statement, [uid]);
    return result;
  }
  async getPublic() {
    const statement = `
    SELECT p.id,p.objName,p.obj,p.uid,p.owner,p.description,p.count
    FROM publicobject p
    `;
    const [result] = await connection.execute(statement);
    return result;
  }
  async deleteObject(id) {
    const statement = `DELETE FROM userInfo WHERE id=?`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async deletePublicObject(id) {
    const statement = `DELETE FROM publicobject WHERE id=?`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async editPublicObject(id, obj, objName, description) {
    const statement = `UPDATE publicobject SET objName = ? , obj = ? , description = ? WHERE id = ?`;
    const result = await connection.execute(statement, [
      objName,
      obj,
      description,
      id,
    ]);
    return result[0];
  }
  async editPublicCopy(id, count) {
    const statement = `UPDATE publicobject SET count = ? WHERE id = ?`;
    const result = await connection.execute(statement, [count, id]);
    return result[0];
  }
  async editObject(id, obj, objName, description) {
    const statement = `UPDATE userinfo SET objName = ? , obj = ? , description = ? WHERE id = ?`;
    const result = await connection.execute(statement, [
      objName,
      obj,
      description,
      id,
    ]);
    return result[0];
  }
}

module.exports = new UserService();
