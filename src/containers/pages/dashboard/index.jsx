import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GetDataFromAPI } from "./../../../config/redux/actions";
import { Card, Button } from "react-bootstrap";

class Dashboard extends Component {
    state = {
        image: "",
        url: "",
    };

    componentDidMount() {
        const dataUser = JSON.parse(localStorage.getItem("User"));
        const { GetDataFromAPI } = this.props;

        GetDataFromAPI(dataUser.uid);
    }

    ubahBarang = (data) => {
        const { SetDataUpdate } = this.props;
        const brg = {
            nama_barang: data.data.nama_barang,
            jumlah: data.data.jumlah,
            harga: data.data.harga,
            desc: data.data.desc,
            img: data.data.img,
            textButton : "UPDATE"
        };
        SetDataUpdate(brg);
    };

    render() {
        const { barang } = this.props;
        const { ubahBarang } = this;
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
                                        src={brg.data.img}
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
    SetDataUpdate : (data) => dispatch({type : 'SET_DATA', value : data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
