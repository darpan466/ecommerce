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
        localStorage.setItem("user", JSON.stringify(data.user));
        return data;
    } catch(error) {
        console.log(error);
        return { "error": "Server is down, please try again later" };
    }
};

export const isSignedIn = () => JSON.parse(localStorage.getItem("user"));

export const signOut = (history) => async () => {
    await Server.get("/signout");
    localStorage.removeItem("user");
    history.push("/signin");
};




