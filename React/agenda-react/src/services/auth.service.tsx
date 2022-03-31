import http from '../http';

class AuthService {
  async login(email: string, password: string) {
    const response = await http.post('/users/auth', { email, password });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }

    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  register(name: string, email: string, password: string) {
    return http.post('users', {
      name,
      email,
      password,
    });
  }

  getCurrentUser() {
    const userCurrent = localStorage.getItem('user');
    if (userCurrent) {
      return JSON.parse(userCurrent);
    }

    return null;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }

    return null;
  }
}

export default new AuthService();
