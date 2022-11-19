import React from "react";
import "./content.css";
import { Container } from "react-bootstrap";
import Promotion from "./../../../../assets/img/iklan.svg";

const Content = () => {
    return (
        <div className="content-wrapper ms-5">
            <Container>
                <Container fluid>
                    <div className="row">
                        <div className="col-7">
                            <h1 className="text-primary title fw-normal mb-4">CRUDApps Marketplace</h1>
                            <div className="hed-body text-white mb-4">
                                <h1>Create, sell or collect</h1>
                                <h1>product items</h1>
                            </div>
                            <p className="desc text-white mb-4">is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                            </p>
                            <div className="explod">
                                <a href="#navigator" className="btn btn-primary py-2 px-5">Explore</a>
                            </div>
                        </div>
                        <div className="col-5 mt-5 ps-5 pt-5">  
                            <img src={Promotion} alt="Iklan Promotion" className="ms-4" />
                        </div>
                    </div>
                </Container>
            </Container>
        </div>
    )
}

export default Content;