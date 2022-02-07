import {EntityRepository, Repository} from 'typeorm'
import {Funcionario} from '../entity/Funcionario'

@EntityRepository(Funcionario)
class FuncionarioRepository extends Repository<Funcionario> {}

export default FuncionarioRepository