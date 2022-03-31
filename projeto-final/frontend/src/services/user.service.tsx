import http from "../http";

class UserService {
  findUsers() {
    return http.get('/users')
  }
}

export default new UserService();