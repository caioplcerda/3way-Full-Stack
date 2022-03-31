import http from '../http';
import IPastor from '../types/pastor.types';

class PastorService {
  create(pastor: IPastor) {
    return http.post('pastores', pastor);
  }

  update(pastor: IPastor) {
    return http.put('pastores', pastor);
  }

  getPastores() {
    return http.get(`pastores`);
  }

  getPastorById(id: number) {
    return http.get(`pastores/${id}`);
  }

  delPastorById(id: number) {
    return http.delete(`pastores/${id}`);
  }
}

export default new PastorService();
