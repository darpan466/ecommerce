import React, { useState } from "react";
import Base from "../core/Base.js";
import { signUp } from "../auth/connect";

const Signup = () => {

    const initData = {
        name: "",
        email: "",
        password: "",
        password2: "",
        error: "",
        success: false
    };

    const [data, setData] = useState(initData);

    const { name, email, password, password2, error, success } = data;

    const handleChange = event => {
        setData({
            ...data, 
            error: "", 
            success: false,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = async event => {
        event.preventDefault();
        const response = await signUp({ name, email, password, password2 });

        if(response.error) {
            setData({
                ...data, 
                error : response.error, 
                success: false
            });
        } else {
            setData({
                ...initData,
                success: true
            });
        }
    };

    const message = () => {

        let message = <></>;

        if(error) message = (
            <div align="center" className="text-danger">
                {data.error}
            </div>
        );

        if(success) message = (
            <div align="center" className="text-white">
                User successfully registered !!!
            </div>
        );

        return message;
    };

    const signUpForm = () => {

        return (
            <div className="row">
                <div className="col-md-4 offset-md-4 text-left">
                    <form>
                        {/* removed form-group below : <div className="form-group"></div> */}
                        <div> 
                            <label> Name </label>
                            <input className="form-control" name="name" type="text" value={name} onChange={handleChange}/>
                        </div>
                        <div>
                            <label> Email </label>
                            <input className="form-control" name="email" type="email" value={email} onChange={handleChange}/>
                        </div>
                        <div>
                            <label> Password </label>
                            <input className="form-control" name="password" type="password" value={password} onChange={handleChange}/>
                        </div>
                        <div>
                            <label> Re-enter Password </label>
                            <input className="form-control" name="password2" type="password" value={password2} onChange={handleChange}/>
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
        <Base title="Sign up page" description="A page for user to sign up!!!">

            {signUpForm()}

            {message()}
            
        </Base>
    );
};

export default Signup;

