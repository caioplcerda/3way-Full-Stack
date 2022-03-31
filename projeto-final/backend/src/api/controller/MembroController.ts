import { Request, Response } from "express";
import { Membro } from "../entity/Membro";
import MembroService from "../service/MembroService";

class MembroController {
  private membroService: MembroService;

  constructor() {
    this.membroService = new MembroService();
  }

  public findAll = async (req: Request, res: Response) => {
    const membros = await this.membroService.findAll();
    res.send(membros);
  };

  public findId = async (req: Request, res: Response) => {
    const id = req.params.id;
    const membros = await this.membroService.findById(Number(id));
    res.send(membros);
  };

  public create = async (req: Request, res: Response) => {
    const membro = req.body as Membro;
    const newMembro = await this.membroService.create(membro);
    res.send(newMembro);
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const membro = req.body as Membro;
    const updateMembro = await this.membroService.update(membro, Number(id));
    res.send(updateMembro);
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deleteMembro = await this.membroService.delete(Number(id));
    res.send(deleteMembro);
  };
}

export default new MembroController();
