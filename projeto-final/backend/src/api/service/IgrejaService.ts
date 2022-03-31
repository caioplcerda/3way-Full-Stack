import { getCustomRepository, getRepository } from "typeorm";
import { Igreja } from "../entity/Igreja";
import IgrejaRepository from "../repository/IgrejaRepository";

export default class IgrejaService {
  public findAll = async () => {
    const igrejaRepository = getRepository(Igreja);
    const igrejas = await igrejaRepository.find();
    return igrejas;
  };

  public findById = async (id: number) => {
    const igrejaRepository = getRepository(Igreja);
    const igreja = await igrejaRepository.findOne(id);
    return igreja;
  };

  public create = async (igreja: Igreja) => {
    const igrejaRepository = getCustomRepository(IgrejaRepository);
    const newigreja = await igrejaRepository.save(igreja);
    return newigreja;
  };

  public update = async (igreja: Igreja, id: number) => {
    const igrejaRepository = getCustomRepository(IgrejaRepository);
    const updateigreja = await igrejaRepository.update(id, igreja);
    return updateigreja;
  };

  public delete = async (id: number) => {
    const igrejaRepository = getCustomRepository(IgrejaRepository);
    const deleteigreja = await igrejaRepository.delete(id);
    return deleteigreja;
  };
  
}
