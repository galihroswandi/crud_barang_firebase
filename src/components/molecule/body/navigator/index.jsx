import React from "react";
import { Container } from "react-bootstrap";
import "./navigator.css";
import Deliver from "./../../../../assets/icons/delivery.svg";
import Order from "./../../../../assets/icons/order.svg";
import Shop from './../../../../assets/icons/shop.svg';
import Settings from './../../../../assets/icons/settings.svg';
import { Link } from "react-router-dom";

const NavigatorComponent = () => {
    return(
        <div className="navigation-wrapper mt-5">
            <Container>
                <Container fluid>
                    <div className="row mt-5 d-grid gap-5 d-flex justify-content-center">
                        <Link to="/delivery" className="col-2 bg-secondary text-center py-4 px-4 text-decoration-none">
                            <img src={Deliver} alt="Delivery" className="mb-4" />
                            <h1 className="text-white fs-4 fw-normal">Delivery</h1>
                        </Link>
                        <Link to="/Order" className="col-2 bg-secondary text-center py-4 px-4 text-decoration-none">
                            <img src={Order} alt="Delivery" className="mb-4" />
                            <h1 className="text-white fs-4 fw-normal">Order</h1>
                        </Link>
                        <Link to="/Shop" className="col-2 bg-secondary text-center py-4 px-4 text-decoration-none">
                            <img src={Shop} alt="Delivery" className="mb-4" />
                            <h1 className="text-white fs-4 fw-normal">Shop</h1>
                        </Link>
                        <Link to="/Settings" className="col-2 bg-secondary text-center py-4 px-4 text-decoration-none">
                            <img src={Settings} alt="Delivery" className="mb-4" />
                            <h1 className="text-white fs-4 fw-normal">Settings</h1>
                        </Link>
                    </div>
                </Container>
            </Container>
        </div>
    )
}

export default NavigatorComponent;