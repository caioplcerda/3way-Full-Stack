import { Request, Response } from "express";
import { Pastor } from "../entity/Pastor";
import PastorService from "../service/PastorService";

class PastorController {
  private pastorService: PastorService;

  constructor() {
    this.pastorService = new PastorService();
  }

  public findAll = async (req: Request, res: Response) => {
    const pastores = await this.pastorService.findAll();
    res.send(pastores);
  };

  public findId = async (req: Request, res: Response) => {
    const id = req.params.id;
    const pastores = await this.pastorService.findById(Number(id));
    res.send(pastores);
  };

  public create = async (req: Request, res: Response) => {
    const pastor = req.body as Pastor;
    const newPastor = await this.pastorService.create(pastor);
    res.send(newPastor);
  };

  public update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const pastor = req.body as Pastor;
    const updatePastor = await this.pastorService.update(pastor, Number(id));
    res.send(updatePastor);
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletePastor = await this.pastorService.delete(Number(id));
    res.send(deletePastor);
  };
}

export default new PastorController();
