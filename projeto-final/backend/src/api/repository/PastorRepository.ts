import { EntityRepository, Repository } from "typeorm";
import { Pastor } from "../entity/Pastor";

@EntityRepository(Pastor)
class PastorRepository extends Repository<Pastor>{ }

export default PastorRepository;