import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GetDataFromAPI } from "./../../../config/redux/actions";
import { Card } from "react-bootstrap";

class Dashboard extends Component {

    componentDidMount() {
        const dataUser = JSON.parse(localStorage.getItem("User"));
        const { GetDataFromAPI } = this.props;

        GetDataFromAPI(dataUser.uid);
    }

    render() {
        const { barang } = this.props;
        return (
            <div className="component-wrapper mb-5">
                <div className="container d-flex flex-column">
                    <div className="div-header d-flex justify-content-around align-items-center mt-4">
                        <h1 className="me-5">Daftar barang</h1>
                        <Link to="/tambah_brg" className="btn btn-dark ms-5">
                            Tambah barang
                        </Link>
                    </div>
                    <div className="body mt-5 d-flex flex-wrap justify-content-center align-items-center">
                        {barang.map((brg, key) => {

                            return (
                                <Card
                                    style={{ width: "18rem" }}
                                    className="me-3 mt-4"
                                    key={key}
                                >
                                    <Card.Img
                                        variant="top"
                                        id="card-img"
                                        src={brg.data.img.imgUrl}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {brg.data.nama_barang}
                                        </Card.Title>
                                        <Card.Text className="text-danger">
                                            Rp. {brg.data.harga}
                                        </Card.Text>
                                        <Card.Text>{brg.data.desc}</Card.Text>
                                        <Link
                                            className="btn btn-dark"
                                            variant="dark"
                                            to={`/ubah_barang/${brg.id}`}
                                        >
                                            Ubah Barang
                                        </Link>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    barang: state.data,
});

const mapDispatchToProps = (dispatch) => ({
    GetDataFromAPI: (userId) => dispatch(GetDataFromAPI(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
