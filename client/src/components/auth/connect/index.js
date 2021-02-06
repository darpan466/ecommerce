import Server from "../../../server.js";

export const signUp = async (user) => {
    try {
        const {data} = await Server.post(`/signup`, user);
        return data;
    } catch(error) {
        console.log(error);
        return { "error": "Server is down, please try again later" };
    }
};

export const signIn = async (user) => {
    try {
        const {data} = await Server.post(`/signin`, user);
        return data;
    } catch(error) {
        console.log(error);
        return { "error": "Server is down, please try again later" };
    }
};



