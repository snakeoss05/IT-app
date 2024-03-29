import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserDao from "../DAO/UserDAO.js";

dotenv.config();

export default class UserController {
  static async registerUser(req, res) {
    const { name, lastname, email, password, role } = req.body;

    const file = req.file; // Get the uploaded file from the request

    if (!file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }

    try {
      const filePath = file.path;
      const fixedPath = filePath.replace(/\\/g, "/");
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await UserDao.registerUser(
        name,
        lastname,
        email,
        hashedPassword,
        role,
        fixedPath
      );

      if (result.error) {
        return res.status(400).send(result.error); // use 400 status code for bad request
      }
      res.status(201).send("Register Success");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;
    const user = await UserDao.loginUser(email);

    try {
      if (!user) {
        return res.status(404).send("User not registered.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).send("Wrong password.");
      }

      const token = jwt.sign({ _id: user._id }, secretOrPrivateKey);

      // Return a JSON response with a message and a status code
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async updateUser(req, res) {
    const { updateDate } = req.body;
    const { id } = req.params;

    try {
      const updatedUser = await UserDao.updateUserProfile(id, updateDate);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }
  static async updateUserState(req, res) {
    const { b } = req.body;
    const { id } = req.params;

    try {
      const updatedUser = await UserDao.UpdateUserState(id, b);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async authenticateToken(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      res.json(user);
    });
  }
  static async getClients(req, res) {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 1;
    try {
      const items = await UserDao.getClientse(page, limit);

      const profilesWithImages = items.results.results.map((userProfile) => {
        const imageFileName = userProfile.filePath;
        const imageURL = `${req.protocol}://${req.get(
          "host"
        )}/${imageFileName}`;
        return { ...userProfile, imageURL }; // Add the imageURL to each user profile
      });
      items.results = profilesWithImages;

      res.json({ items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getAdminListe(req, res) {
    try {
      const cliente = await UserDao.getAdminlist();

      const profilesWithImages = cliente.map((userProfile) => {
        const imageFileName = userProfile.filePath;
        const imageURL = `${req.protocol}://${req.get(
          "host"
        )}/${imageFileName}`;
        return { ...userProfile, imageURL };
      });

      res.json(profilesWithImages);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
  static async getUserProfile(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const id = decodedToken._id;

      const user = await UserDao.findUserById(id); // Fetch user data from database
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const profilesWithImages = () => {
        const imageFileName = user.filePath;
        const imageURL = `${req.protocol}://${req.get(
          "host"
        )}/${imageFileName}`;
        return { ...user, imageURL };
      };
      res.json(profilesWithImages());
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const UserDelete = await UserDao.deleteUserDao(id);
      res.status(200).json(UserDelete);
    } catch (e) {
      console.error(`Unable to delete client with id ${id}: ${e}`);
      res.status(500).send({ error: e });
    }
  }

  static async getgpMusculation(req, res) {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 1;
    const groupe = req.query.groupe;
    try {
      const newFormData = await UserDao.findgpMusculation(page, limit, groupe);
      const profilesWithImages = newFormData.results.results.map(
        (userProfile) => {
          const imageFileName = userProfile.filePath;
          const imageURL = `${req.protocol}://${req.get(
            "host"
          )}/${imageFileName}`;
          return { ...userProfile, imageURL };
        }
      );
      newFormData.results = profilesWithImages;

      res.json({ newFormData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
