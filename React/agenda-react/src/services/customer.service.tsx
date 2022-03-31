import http from '../http';
import ICustomer from '../types/customer.types';

class CustomerService {
  create(customer: ICustomer) {
    return http.post('clientes', customer);
  }

  update(customer: ICustomer) {
    return http.put('clientes', customer);
  }

  getCustomers() {
    return http.get(`clientes`);
  }

  getCustomerById(id: number) {
    return http.get(`clientes/${id}`);
  }

  delCustomerById(id: number) {
    return http.delete(`clientes/${id}`);
  }
}

export default new CustomerService();
