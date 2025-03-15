import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});


const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }
    );
    axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
            return alert("Unauthorized! Token might be invalid or expired. Please Reload before take any action .")
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;
