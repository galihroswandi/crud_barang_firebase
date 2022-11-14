import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { GetDataFromAPI } from './../../../config/redux/actions';
import { Card, Button } from 'react-bootstrap';
import { getBarangFromAPI } from './../../../config/redux/actions/postImage';

class Dashboard extends Component {

    state = {
        image: '',
        url: ''
    }

    componentDidMount() {
        const dataUser = JSON.parse(localStorage.getItem('User'));
        const { GetDataFromAPI, GetBarangFromAPI } = this.props;

        GetDataFromAPI(dataUser.uid);
        GetBarangFromAPI();
    }

    getImageFromAPI = (img) => {
        const { image } = this.props;
        const gambar = image.filter(data => data.id == img);
        try{
            return gambar[0].img;
        }catch(err){
            return null;
        }
    }

    render() {
        const { barang } = this.props;
        const { getImageFromAPI } = this;
        return (
            <div className="component-wrapper mb-5">
                <div className="container d-flex flex-column">
                    <div className="div-header d-flex justify-content-around align-items-center mt-4">
                        <h1 className="me-5">Daftar barang</h1>
                        <Link to="/tambah_brg" className="btn btn-dark ms-5">Tambah barang</Link>
                    </div>
                    <div className="body mt-5 d-flex flex-wrap justify-content-center align-items-center">
                        {
                            barang.map((brg, key) => {
                                return (
                                    <Card style={{ width: '18rem' }} className="me-3 mt-4" key={key}>
                                        <Card.Img variant="top" src={getImageFromAPI(brg.data.img)} />
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
    image: state.image
})

const mapDispatchToProps = (dispatch) => ({
    GetDataFromAPI: (userId) => dispatch(GetDataFromAPI(userId)),
    GetBarangFromAPI: (image) => dispatch(getBarangFromAPI(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);