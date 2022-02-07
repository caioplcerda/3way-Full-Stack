import {Router} from 'express'
import ClienteController from '../controller/ClienteController'

const clienteRoutes = Router()

clienteRoutes.get('/', ClienteController.findAll);
clienteRoutes.get('/:id', ClienteController.findById);
clienteRoutes.get('/find-by-name/:name', ClienteController.findByName);
clienteRoutes.post('/', ClienteController.create);
clienteRoutes.put('/:id', ClienteController.update);
clienteRoutes.delete('/:id', ClienteController.delete);

export default clienteRoutes