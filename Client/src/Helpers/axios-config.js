import axios from 'axios';

const successhandler = (response) => {
    return response
}

const errorhandler = (error) => {
    if(error.response.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem("drivertoken");
        window.location = "/userlogin"
    }
    return Promise.reject(error)
}

axios.interceptors.response.use(successhandler,errorhandler)

export default axios