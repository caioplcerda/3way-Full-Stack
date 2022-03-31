import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../entity/User";
import UserService from "../service/UserService";

class UserController {

    private userService: UserService;

    async register(req: Request, res: Response) {
        this.userService = new UserService();
        const user = req.body as User;

        const userExists = await this.userService.userExists(user.email);
        if (userExists) {
            return res.sendStatus(409);
        }

        user.password = bcrypt.hashSync(user.password, 8);

        const newUser = await this.userService.register(user);

        return res.send(newUser);
    }

    public findAll = async (req: Request, res: Response) => {
        this.userService = new UserService();
        const users = await this.userService.findAll();
        res.send(users);
    }

}

export default new UserController();