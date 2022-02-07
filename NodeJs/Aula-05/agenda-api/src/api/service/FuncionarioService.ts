import { getCustomRepository, getRepository } from "typeorm";
import { Funcionario } from "../entity/Funcionario";
import FuncionarioRepository from "../repository/FuncionarioRepository";

export default class FuncionarioService {

    public findAll = async () => {
        const funcionarioRepository = getRepository(Funcionario);
        const funcionarios = await funcionarioRepository.find();
        return funcionarios;
    }

    public findById = async (id: number) => {
        const funcionarioRepository = getRepository(Funcionario);
        const funcionario = await funcionarioRepository.findOne(id);
        return funcionario;
    }

    public create = async (funcionario: Funcionario) => {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository);
        const newFuncionario = await funcionarioRepository.save(funcionario);
        return newFuncionario;
    }
    public update = async (funcionario: Funcionario, id: number) => {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository);
        const updateFuncionario = await funcionarioRepository.update(id, funcionario);
        return updateFuncionario;
    }
    public delete = async (id: number) => {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository);
        const deleteFuncionario = await funcionarioRepository.delete(id);
        return deleteFuncionario;
    }
}