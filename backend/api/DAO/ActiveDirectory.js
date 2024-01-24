import { ad } from "../activeDirectoryConfig/adconfig.js";

export default class AdUserDAO {
  static async addUser(user) {
    return await ad.addUser(user.username, user);
  }
}
