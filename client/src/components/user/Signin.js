import React, {useState} from "react";
import Base from "../core/Base.js";
import { signIn } from "../auth/connect";

const Signin = ({history}) => {
    
    const initData = {
        email: "",
        password: "",
        error: "", 
        role: ""
    };

    const [data, setData] = useState(initData);

    const { email, password, error, role } = data;

    const handleChange = event => {
        setData({
            ...data,
            error: "",
            [event.target.name]: event.target.value 
        });
    };

    const onSubmit = async event => {
        event.preventDefault();
        const response = await signIn({ email, password });
        if(response.error) {
            setData({
                ...data,
                error: response.error
            });
        } else {
            setData({
                ...initData,
                role: response.user.role,
            });
            role === 1 ? 
            history.push("/"): 
            history.push("/");
        }
    };

    const message = () => {
        if(error) 
            return (
                <div align="center" className="text-danger">
                    {data.error}
                </div>
            )
        return <></>; 
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4 text-left">
                    <form>
                        {/* removed form-group below : <div className="form-group"></div> */}
                        <div>
                            <label> Email </label>
                            <input className="form-control" name="email" value={email} type="email" onChange={handleChange} />
                        </div>
                        <div>
                            <label> Password </label>
                            <input className="form-control" name="password" value={password} type="password" onChange={handleChange} />
                        </div>
                        <div className="d-grid py-3">
                            <button type="Submit" className="btn btn-success rounded" onClick={onSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="Sign in page" description="A page for user to sign in!!!">
            {signInForm()}
            {message()}
        </Base>
    );
};

export default Signin;

