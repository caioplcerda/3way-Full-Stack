import { getCustomRepository, getRepository } from "typeorm";
import { Pastor } from "../entity/Pastor";
import PastorRepository from "../repository/PastorRepository";

export default class PastorService {
  public findAll = async () => {
    const pastorRepository = getRepository(Pastor);
    const pastores = await pastorRepository.find();
    return pastores;
  };

  public findById = async (id: number) => {
    const pastorRepository = getRepository(Pastor);
    const pastor = await pastorRepository.findOne(id);
    return pastor;
  };

  public create = async (pastor: Pastor) => {
    const pastorRepository = getCustomRepository(PastorRepository);
    const newpastor = await pastorRepository.save(pastor);
    return newpastor;
  };

  public update = async (pastor: Pastor, id: number) => {
    const pastorRepository = getCustomRepository(PastorRepository);
    const updatepastor = await pastorRepository.update(id, pastor);
    return updatepastor;
  };

  public delete = async (id: number) => {
    const pastorRepository = getCustomRepository(PastorRepository);
    const deletepastor = await pastorRepository.delete(id);
    return deletepastor;
  };
  
}
