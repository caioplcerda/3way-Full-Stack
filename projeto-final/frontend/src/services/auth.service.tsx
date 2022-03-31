import http from "../http";
import IUser from "../types/user.types";

class AuthService {

  async athenticate(user: IUser){
    const response = await http.post('/users/auth', user);

    if(response.data.token){
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }

    return response.data
  }

  async register(user: IUser){
    return http.post('users/register', user)
  }

  logout(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getCurrentUser(){
    const userCurrent = localStorage.getItem('user');
    if(userCurrent){
      return JSON.parse(userCurrent);
    }
    return null;
  }

  getToken(){
    const token = localStorage.getItem('token');
    if(token){
      return JSON.parse(token);
    }
    return null;
  }
}

export default new AuthService();