import http from '../http';
import IEmployee from '../types/employee.types';

class EmployeeService {
  create(employee: IEmployee) {
    return http.post('funcionarios', employee);
  }

  update(employee: IEmployee) {
    return http.put('funcionarios', employee);
  }

  getEmployees() {
    return http.get(`funcionarios`);
  }

  getEmployeeById(id: number) {
    return http.get(`funcionarios/${id}`);
  }

  delEmployeeById(id: number) {
    return http.delete(`funcionarios/${id}`);
  }
}

export default new EmployeeService();
