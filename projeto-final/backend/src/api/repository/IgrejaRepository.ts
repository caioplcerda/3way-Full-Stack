import { EntityRepository, Repository } from "typeorm";
import { Igreja } from "../entity/Igreja";

@EntityRepository(Igreja)
class IgrejaRepository extends Repository<Igreja>{ }

export default IgrejaRepository;