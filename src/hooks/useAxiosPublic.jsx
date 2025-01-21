import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://carecamps-server.vercel.app'
});

const UseAxiosPublic = () => {
    return axiosInstance;
}

export default UseAxiosPublic;
