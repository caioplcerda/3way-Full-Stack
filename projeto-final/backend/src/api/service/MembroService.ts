import { getCustomRepository, getRepository } from "typeorm";
import { Membro } from "../entity/Membro";
import MembroRepository from "../repository/MembroRepository";

export default class MembroService {
  public findAll = async () => {
    const membroRepository = getRepository(Membro);
    const membros = await membroRepository.find();
    return membros;
  };

  public findById = async (id: number) => {
    const membroRepository = getRepository(Membro);
    const membro = await membroRepository.findOne(id);
    return membro;
  };

  public create = async (membro: Membro) => {
    const membroRepository = getCustomRepository(MembroRepository);
    const newmembro = await membroRepository.save(membro);
    return newmembro;
  };

  public update = async (membro: Membro, id: number) => {
    const membroRepository = getCustomRepository(MembroRepository);
    const updatemembro = await membroRepository.update(id, membro);
    return updatemembro;
  };

  public delete = async (id: number) => {
    const membroRepository = getCustomRepository(MembroRepository);
    const deletemembro = await membroRepository.delete(id);
    return deletemembro;
  };
  
}
