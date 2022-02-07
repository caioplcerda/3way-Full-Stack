import { getCustomRepository, getRepository } from "typeorm";
import { Cliente } from "../entity/Cliente";
import ClienteRepository from "../repository/ClienteRepository";

export default class ClienteService {

    public findAll = async () => {
        const clienteRepository = getRepository(Cliente);
        const clientes = await clienteRepository.find();
        return clientes;
    }

    public findById = async (id: number) => {
        const clienteRepository = getRepository(Cliente);
        const cliente = await clienteRepository.findOne(id);
        return cliente;
    }

    public findByName = async (name: string) => {
        const clienteRepository = getRepository(Cliente);
        const cliente = await clienteRepository
            .createQueryBuilder("cliente")
            .where("cliente.name like :name", { name: `%${name}%` })
            .getMany();
        return cliente;
    }

    public create = async (cliente: Cliente) => {
        const clienteRepository = getCustomRepository(ClienteRepository);
        const newCliente = await clienteRepository.save(cliente);
        return newCliente;
    }

    public update = async (cliente: Cliente, id: number) => {
        const clienteRepository = getCustomRepository(ClienteRepository);
        const updateCliente = await clienteRepository.update(id, cliente);
        return updateCliente;
    }

    public delete = async (id: number) => {
        const clienteRepository = getCustomRepository(ClienteRepository);
        const deleteCliente = await clienteRepository.delete(id);
        return deleteCliente;
    }

}