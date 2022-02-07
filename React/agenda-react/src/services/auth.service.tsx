import http from "../http";

class AuthService{

    async login(email: string, password: string) {
        const response = await http.post('/users/auth', {email, password});

        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }

        return response.data;
    }

    logout(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    register(name: string, email: string, password: string) {
        return http.post('user', {
            name, email, password
        });
    }

    getCurrentUSer() {
        const userCurrent = localStorage.getItem('user');
        if(userCurrent){
            return JSON.parse(userCurrent);
        }

        return null;
    }
}

export default new AuthService();