import axios from 'axios';
import useAuth from "./useAuth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    baseURL: 'https://carecamps-server.vercel.app'
})

const UseAxiosPrivate = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    //adding auth header on every private req
    axiosInstance.interceptors.request.use(request => {
        const token = localStorage.getItem('access token');
        request.headers.token = token;
        return request;
    }, error => {
        return Promise.reject(error);
    });

    //checking and forbid if any error on verifying
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        const status = error.response.status;
        if(status === 401 || status === 403){
            	logOut();
                localStorage.removeItem('access token');
                navigate('/');
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "warning",
                    title: "Session expired! Please login."
                });
        }
    })
    return axiosInstance;
}

export default UseAxiosPrivate;
