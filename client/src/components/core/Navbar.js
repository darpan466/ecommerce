import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isSignedIn, signOut } from "../auth/connect"; 


const Navbar = ({history}) => {

    const currTab = (path) => {
        if(history.location.pathname === path) {
            return {color: "#2ecc72"};
        } else {
            return {color: "#ffffff"};
        }
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li>
                    <Link className="nav-link" style={currTab("/")} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={currTab("/cart")}  to="/cart">
                        Cart
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={currTab("/user/dashboard")} to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={currTab("/admin/dashboard")} to="/admin/dashboard">
                        Admin Dashboard
                    </Link>
                </li>
                {!isSignedIn() &&
                    <li>
                        <Link className="nav-link" style={currTab("/signup")} to="/signup">
                            Sign Up
                        </Link>
                    </li>
                }
                {!isSignedIn() &&
                    <li>
                        <Link className="nav-link" style={currTab("/signin")} to="/signin">
                            Sign In
                        </Link>
                    </li>
                }
                {isSignedIn() &&
                    <li>
                        <span className="nav-link text-warning" style={{cursor: "pointer"}} onClick={signOut(history)}>
                            Sign out
                        </span>
                    </li>
                }
            </ul>
        </div>
    );
};

export default withRouter(Navbar);