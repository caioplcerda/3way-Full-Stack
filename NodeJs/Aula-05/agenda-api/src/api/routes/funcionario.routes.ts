import {Router} from 'express'
import FuncionarioController from '../controller/FuncionarioController';

const funcionarioRoutes = Router()

funcionarioRoutes.get('/', FuncionarioController.findAll);
funcionarioRoutes.get('/:id', FuncionarioController.findById);
funcionarioRoutes.post('/', FuncionarioController.create);
funcionarioRoutes.put('/:id', FuncionarioController.update);
funcionarioRoutes.delete('/:id', FuncionarioController.delete);

export default funcionarioRoutes