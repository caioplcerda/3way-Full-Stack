import http from '../http';
import IMembro from '../types/membro.types';

class MembroService {
  create(membro: IMembro
    ) {
    return http.post('membros', membro);
  }

  update(membro: IMembro
    ) {
    return http.put('membros', membro);
  }

  getMembros() {
    return http.get(`membros`);
  }

  getMembroById(id: number) {
    return http.get(`membros/${id}`);
  }

  delMembroById(id: number) {
    return http.delete(`membros/${id}`);
  }
}

export default new MembroService();
