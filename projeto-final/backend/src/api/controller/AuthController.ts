import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../entity/User";
import UserService from "../service/UserService";
const { authSecret } = require("../../../.env");

class AuthController {
  private userService: UserService;

  async authenticate(req: Request, res: Response) {
    this.userService = new UserService();
    const { email, password } = req.body as User;

    const user = await this.userService.userExists(email);
    if (!user) {
      return res.status(401).send("Email não encontrado!!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Senha inválida!!");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      authSecret,
      {
        expiresIn: "1d",
      }
    );

    return res.send({
      user,
      token,
    });
  }
}

export default new AuthController();
