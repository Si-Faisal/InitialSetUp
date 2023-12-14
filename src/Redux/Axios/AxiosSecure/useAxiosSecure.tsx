
import axios, { AxiosInstance, InternalAxiosRequestConfig} from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { AnyAction } from 'redux';
import { AppDispatch } from "Redux/Store/store";
import { UserLogOut } from "../../Slice/FirebaseAuthSlice";

const axiosSecure :  AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})
const useAxiosSecure = (): AxiosInstance => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(
        (config: InternalAxiosRequestConfig<any>) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(
        (response)=> {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await dispatch(UserLogOut());
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;