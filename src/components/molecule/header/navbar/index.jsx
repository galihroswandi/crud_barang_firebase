import React from "react";
import "./navbar.css";
import { Container, Navbar, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logout from './../../../../assets/icons/logout.svg';

const NavbarComponent = () => {
    return (
        <Navbar bg="transparent" variant="dark" expand="lg">
            <Container className="py-2">
                <div className="navbar-brand ms-5">
                    <Link to="/" className="text-decoration-none text-white"><h1 className="fs-2 fw-semibold text-primary">CRUDApps</h1></Link>
                </div>
                <div className="navbar-nav">
                    <ul className="d-flex justify-content-center align-items-center d-grid gap-3 me-4">
                        <li className="list-group-item py-1 px-3"><Link to="/" className="text-white text-decoration-none fs-5 fw-normal">Home</Link></li>
                        <li className="list-group-item py-1 px-3"><a to="#products" className="text-white text-decoration-none fs-5 fw-normal">Product</a></li>
                        <li className="list-group-item py-1 px-3"><a to="#" className="text-white text-decoration-none fs-5 fw-normal">About</a></li>
                        <li className="list-group-item ms-2">
                            <a to="#">
                                <img src={Logout} alt="Logout" title="Logout" width="35" />
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;