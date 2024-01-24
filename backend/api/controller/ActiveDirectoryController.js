import AdUserDAO from "../DAO/ActiveDirectory.js";

export default class AdUserController {
  static async addUser(req, res) {
    const user = req.body;
    try {
      const result = await AdUserDAO.addUser(user);
      res.send("User added successfully.", result);
    } catch (err) {
      res.json(err);
    }
  }
}
