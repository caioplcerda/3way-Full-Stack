import { getCustomRepository, getRepository } from "typeorm"
import User from "../entity/User"
import UserRepository from "../repository/UserRepository"


export default class UserService {
    public userExist = async (email: string) => {
        const UserRepository = getRepository(User)
        const user = await UserRepository.findOne({ where: { email } })
        return user;
    }

    public create = async (user: User) => {
        const userRepository = getCustomRepository(UserRepository);
        const newUser = await userRepository.save(user);
        return newUser;
    }

    public findAll = async () => {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        return users;
    }
}