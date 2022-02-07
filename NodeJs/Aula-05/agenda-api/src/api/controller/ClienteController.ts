import { Request, Response } from "express";
import { Cliente } from "../entity/Cliente";
import ClienteService from "../service/ClienteService"

class ClienteController {

    private clienteService: ClienteService;

    constructor(){
        this.clienteService = new ClienteService();
    }

    public findAll =async (req: Request, res: Response) => {
        const clientes = await this.clienteService.findAll()
        res.send(clientes).json()
    }

    public findById =async (req: Request, res: Response) => {
        const id = req.params.id;
        const cliente = await this.clienteService.findById(Number(id))
        res.send(cliente).json()
    }

    public findByName = async (req: Request, res: Response) => {
        const name = req.params.name;
        const cliente = await this.clienteService.findByName(name);
        res.send(cliente).json();
    }

    public create =async (req: Request, res: Response) => {
        const cliente = req.body as Cliente;
        const newCliente = await this.clienteService.create(cliente)
        res.send(newCliente)
    }

    public update =async (req: Request, res: Response) => {
        const cliente = req.body as Cliente;
        const id = req.params.id;
        const updateCliente = await this.clienteService.update(cliente, Number(id))
        res.send(updateCliente)
    }

    public delete =async (req: Request, res: Response) => {
        const id = req.params.id;
        const deleteCliente = await this.clienteService.delete(Number(id))
        res.send(deleteCliente)
    }
}

export default new ClienteController()