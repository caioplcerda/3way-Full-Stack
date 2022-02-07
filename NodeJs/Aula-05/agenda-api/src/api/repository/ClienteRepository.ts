import {EntityRepository, Repository} from 'typeorm'
import {Cliente} from '../entity/Cliente'

@EntityRepository(Cliente)
class ClienteRepository extends Repository<Cliente> {}

export default ClienteRepository