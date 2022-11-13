import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { GetDataFromAPI, PostImgToFirebase } from './../../../config/redux/actions';
import { Card, Button } from 'react-bootstrap';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";

class Dashboard extends Component {

    state = {
        image: '',
        url: ''
    }

    componentDidMount() {
        const dataUser = JSON.parse(localStorage.getItem('User'));
        const { GetDataFromAPI, PostImgToFirebase } = this.props;

        GetDataFromAPI(dataUser.uid);
    }

    render() {
        const { barang } = this.props;
        return (
            <div className="component-wrapper mb-5">
                <div className="container d-flex flex-column">
                    <div className="div-header d-flex justify-content-around align-items-center mt-4">
                        <h1 className="me-5">Daftar barang</h1>
                        <Link to="/tambah_brg" className="btn btn-dark ms-5">Tambah barang</Link>
                    </div>
                    <div className="body mt-5 d-flex flex-wrap justify-content-center align-items-center">
                        {
                            barang.map(brg => {
                                return (
                                    <Card style={{ width: '18rem' }} className="me-3 mt-4">
                                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1657214059169-c01172e56be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                                        <Card.Body>
                                            <Card.Title>{brg.data.nama_barang}</Card.Title>
                                            <Card.Text className="text-danger">Rp. {brg.data.harga}</Card.Text>
                                            <Card.Text>{brg.data.desc}</Card.Text>
                                            <Button variant="dark">Ubah Barang</Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    barang: state.data,
})

const mapDispatchToProps = (dispatch) => ({
    GetDataFromAPI: (userId) => dispatch(GetDataFromAPI(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);