import http from '../http';
import IIgreja from '../types/igreja.types';

class IgrejaService {
  create(igreja: IIgreja) {
    return http.post('igrejas', igreja);
  }

  update(igreja: IIgreja) {
    return http.put('igrejas', igreja);
  }

  getIgrejas() {
    return http.get(`igrejas`);
  }

  getIgrejaById(id: number) {
    return http.get(`igrejas/${id}`);
  }

  delIgrejaById(id: number) {
    return http.delete(`igrejas/${id}`);
  }
}

export default new IgrejaService();
