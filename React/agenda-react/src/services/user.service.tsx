import http from "../http";

class UserService {
  getUserBoard(){
    return http.get('/users');
  }
}

export default new UserService();