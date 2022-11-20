import React from "react";
import { Container, Row } from "react-bootstrap";
import "./footer.css";
import Facebook from '../../../assets/icons/facebook.svg';
import Instagram from './../../../assets/icons/instagram.svg';
import Github from './../../../assets/icons/github.svg';

const FooterComponent = () => {
    return (
        <footer className="position-absolute end-0 start-0 bottom-1 py-2 mt-5">
            <Container className="mt-3">
                <Container fluid>
                    <Row className="d-flex">
                        <div className="col-3">
                            <p className="text-white">&copy; <span>2022-GalihRoswandi</span></p>
                        </div>
                        <div className="col-3 offset-6 d-flex gap-3">
                            <a>
                                <img src={Facebook} alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com/galihrswnd/" target="blank">
                                <img src={Instagram} alt="Instagram" />
                            </a>
                            <a href="https://github.com/galihroswandi" target="blank">
                                <img src={Github} alt="Github" />
                            </a>
                        </div>
                    </Row>
                </Container>
            </Container>
        </footer>
    )
}

export default FooterComponent;