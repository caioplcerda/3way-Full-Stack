import { getCustomRepository, getRepository } from "typeorm";
import User from "../entity/User";
import UserRepository from "../repository/UserRepository";

export default class UserService {
  public userExists = async (email: string) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    return user;
  };

  public register = async (user: User) => {
    const userRepository = getCustomRepository(UserRepository);
    const newUser = await userRepository.save(user);
    return newUser;
  };

  public findAll = async () => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  };
}
