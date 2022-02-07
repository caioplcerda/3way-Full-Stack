import { Request, Response } from "express";
import User from "../entity/User";
import UserService from "../service/UserService"
import bcrypt from "bcryptjs"

class UserController {
    private userService: UserService

    constructor(){
        this.userService = new UserService();
    }

    async create(req: Request, res: Response) {
        this.userService = new UserService()
        const user = req.body as User


        const userExist = await this.userService.userExist(user.email);
        if(userExist){
            return res.sendStatus(409)
        }
        
        user.password = bcrypt.hashSync(user.password, 8);

        const newUser = await this.userService.create(user);

        return res.send(newUser)
    }

    public findAll =async (req: Request, res: Response) => {
        const users = await this.userService.findAll()
        res.send(users).json()
    }

}

export default new UserController