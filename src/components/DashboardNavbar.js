import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './css/DashboardNavbar.css';
import logo from "../images/bblogo.png"
import logo_small from "../images/minlogo.png"
import {useSelector} from "react-redux";

function DashboardNavbar(props) {
    const logout = props.logout;
    const username = useSelector((state) => state.username);
    const email = useSelector((state) => state.email);
    const avi = useSelector((state) => state.avi);

    const [open, setOpen] = useState(false);

    const changeOpen = () => {
        setOpen(!open);
    };
    return (
        <>
            <nav className="dashboard-navbar">
                <div className="dashboard-navbar-container">


                    <div className="dashboard-navbar-extras">
                        <div className="navbar-logo-container">
                            <Link to="/">
                                <picture style={{maxWidth: "100%"}}>
                                    <source media="(min-width: 1100px)" srcset={logo}/>
                                    <img style={{paddingTop: "15px"}} src={logo_small} alt="Logo"/>
                                </picture>
                            </Link>
                        </div>
                    </div>
                    <div className={open ? "rightSection active" : "rightSection"}>
                            <img
                                onClick={changeOpen}
                                alt="User Avatar"
                                className="navbar-image"
                                //src={require("../images/icons/" + avi + ".png")}
                                src={require("../images/team/lassooijAlex.jpeg")}

                            />
                    </div>
                    <div className={open ? "dropDown active" : "dropDown"}>
                        <div className="drop-user">
                            <text>{username}</text>
                            <text>
                                {email}
                            </text>
                        </div>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default DashboardNavbar


