import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './css/Navbar.css';
import logo from "../images/bblogo.png"
import logo_small from "../images/minlogo.png"
import close from '../images/icons/close.svg';
import menu from '../images/icons/menu.svg';
import {useSelector} from "react-redux";

function Navbar(props) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click)
    const [open, setOpen] = useState(false);


    const changeOpen = () => {
        setOpen(!open);
    };
        return (
            <>
                <nav className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-extras">
                            <div className="navbar-logo-container">
                                <Link to="/">
                                    <picture style={{maxWidth: "100%"}}>
                                        <source media="(min-width: 1100px)" srcset={logo}/>
                                        <img style={{paddingTop: "15px"}} src={logo_small} alt="Logo"/>
                                    </picture>
                                </Link>
                            </div>


                            <div className="mobile-menu-button" onClick={handleClick}>
                                <img src={click ? close : menu} height="40%"/>
                            </div>
                        </div>
                        <div className={click ? "navbar-wrapper active" : "navbar-wrapper"}>
                            <ul className={click ? "navbar-content active" : "navbar-content"}>

                                <li className="nav-item">
                                    <Link to='/about-us' className='nav-links'>
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/team' className='nav-links'>
                                        Our Team
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/updates' className='nav-links'>
                                        Updates
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/contactUs' className='nav-links'>
                                        Contact
                                    </Link>
                                </li>

                                <li className="login-link">
                                    <Link to='/login' className='nav-links-blue' onClick={changeOpen}>
                                        Login
                                    </Link>
                                    <div className="dropdown-navbar">
                                        <div onClick={handleClick} className="drop-login">
                                            <Link to='/loginWithEmail' className='login-drop-links'
                                                  style={{border: "none",}}>Email</Link>
                                            <span className="blue-line"></span>
                                            <Link style={{border: "none"}} to='/loginWithSocial'
                                                  className='login-drop-links' >Social</Link>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signup' className='nav-links-blue'>
                                        Sign Up
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>

                </nav>
            </>
        );
}


export default Navbar
