import Axios from "axios";

const Server = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    withCredentials: true
});

export default Server;
