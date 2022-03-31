import { EntityRepository, Repository } from "typeorm";
import { Membro } from "../entity/Membro";

@EntityRepository(Membro)
class MembroRepository extends Repository<Membro>{ }

export default MembroRepository;