import axios from "axios";

class Login {
    private API = axios.create({
        baseURL: "https://yvypora.eastus.cloudapp.azure.com/api/",
        headers: {
            common: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
    })
    public async login(): Promise<string> {
        const { data } = await axios.post('https://yvypora.eastus.cloudapp.azure.com/api/commons/login/', {
            email: "entregador@gmail.com",
            password: "12345678"
        });
        const { token } = data;
        
        localStorage.setItem('token', token);
        
        return token;
    }

    public async saveDetails() {
       const { data } = await this.API.get('commons/user/details')
       localStorage.setItem('user', JSON.stringify(data))
    }
}

export default new Login();



