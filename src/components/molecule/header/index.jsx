import React from "react";
import Content from './content';
import "./header.css";
import Background from './../../../assets/img/background.png';
import NavbarComponent from "./navbar";

const Header = () => {
    return (
        <div className="component-header-wrapper" style={{ backgroundImage: `url(${Background})` }}>
            <nav>
                <NavbarComponent />
                <Content />
            </nav>
        </div>
    )
}

export default Header;