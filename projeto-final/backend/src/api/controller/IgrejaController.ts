import { Request, Response } from "express";
import { Igreja } from "../entity/Igreja";
import IgrejaService from "../service/IgrejaService";

class IgrejaController {
  private igrejaService: IgrejaService;

  constructor() {
    this.igrejaService = new IgrejaService();
  }

  public findAll = async (req: Request, res: Response) => {
    const igrejas = await this.igrejaService.findAll();
    res.send(igrejas);
  };

  public findId = async (req: Request, res: Response) => {
    const id = req.params.id;
    const igrejas = await this.igrejaService.findById(Number(id));
    res.send(igrejas);
  };

  public create = async (req: Request, res: Response) => {
    const igreja = req.body as Igreja;
    const newIgreja = await this.igrejaService.create(igreja);
    res.send(newIgreja);
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const igreja = req.body as Igreja;
    const updateIgreja = await this.igrejaService.update(igreja, Number(id));
    res.send(updateIgreja);
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deleteIgreja = await this.igrejaService.delete(Number(id));
    res.send(deleteIgreja);
  };
}

export default new IgrejaController();
