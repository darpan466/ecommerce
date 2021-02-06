import React from "react";
import { Link, withRouter } from "react-router-dom";

import Server from "../../server.js";


const currTab = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "#2ecc72"};
    } else {
        return {color: "#ffffff"};
    }
};

const isSignedIn = () => localStorage.getItem("user");

const handleSignOut = (history) => async () => {
    await Server.get("/signout");
    localStorage.removeItem("user");
    history.push("/signin");
};


const Navbar = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li>
                    <Link className="nav-link" style={currTab(history, "/")} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={currTab(history, "/cart")}  to="/cart">
                        Cart
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={currTab(history, "/user/dashboard")} to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={currTab(history, "/admin/dashboard")} to="/admin/dashboard">
                        Admin Dashboard
                    </Link>
                </li>
                {!isSignedIn() &&
                    <li>
                        <Link className="nav-link" style={currTab(history, "/signup")} to="/signup">
                            Sign Up
                        </Link>
                    </li>
                }
                {!isSignedIn() &&
                    <li>
                        <Link className="nav-link" style={currTab(history, "/signin")} to="/signin">
                            Sign In
                        </Link>
                    </li>
                }
                {isSignedIn() &&
                    <li>
                        <span className="nav-link text-warning" style={{cursor: "pointer"}} onClick={handleSignOut(history)}>
                            Sign out
                        </span>
                    </li>
                }
            </ul>
        </div>
    );
};

export default withRouter(Navbar);