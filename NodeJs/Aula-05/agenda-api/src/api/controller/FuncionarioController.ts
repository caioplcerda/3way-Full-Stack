import { Request, Response } from "express";
import { Funcionario } from "../entity/Funcionario";
import FuncionarioService from "../service/FuncionarioService"

class FuncionarioController {

    private funcionarioService: FuncionarioService;

    constructor(){
        this.funcionarioService = new FuncionarioService();
    }

    public findAll =async (req: Request, res: Response) => {
        const funcionarioS = await this.funcionarioService.findAll()
        res.send(funcionarioS).json()
    }

    public findById =async (req: Request, res: Response) => {
        const id = req.params.id;
        const funcionario = await this.funcionarioService.findById(Number(id))
        res.send(funcionario).json()
    }

    public create =async (req: Request, res: Response) => {
        const funcionario = req.body as Funcionario;
        const newFuncionario = await this.funcionarioService.create(funcionario)
        res.send(newFuncionario)
    }

    public update =async (req: Request, res: Response) => {
        const funcionario = req.body as Funcionario;
        const id = req.params.id;
        const updateFuncionario = await this.funcionarioService.update(funcionario, Number(id))
        res.send(updateFuncionario)
    }

    public delete =async (req: Request, res: Response) => {
        const id = req.params.id;
        const deleteFuncionario = await this.funcionarioService.delete(Number(id))
        res.send(deleteFuncionario)
    }

}

export default new FuncionarioController