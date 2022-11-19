import React, { useState } from "react";
import "./products.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgDummy1 from "./../../../../assets/img/img-dummy-1.png";
import Ubah from './../../../../assets/icons/ubah.svg';
import Delete from "./../../../../assets/icons/delete.svg";
import Plus from "./../../../../assets/icons/plus.svg";
import { connect } from "react-redux";

const Products = (props) => {
    console.log(props.barang);
    return (
        <div className="products-wrapper mt-5" id="products">
            <Container>
                <Container fluid>
                    <div className="row">
                        <div className="col-6 mt-4">
                            <h1 className="text-white fw-semibold">Products</h1>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <Link to="/tambah_brg" className="btn btn-primary d-flex justify-content-center align-items-center" style={{ height: '2.5rem' }}>
                                <img src={Plus} alt="Tambah Barang" className="me-2" />
                                <span>Tambah barang</span>
                            </Link>
                        </div>
                    </div>
                    <div className="row d-flex flex-wrap justify-content-center">
                        {
                            props.barang.map((brg, key) => {
                                return (
                                    <div className="col-2 ms-5 mt-5 cardComp px-0 position-relative overflow-hidden">
                                        <div className="card-header mb-4">
                                            <img src={brg.data.img.imgUrl} alt="Product" width="100%" />
                                        </div>
                                        <div className="card-body px-3 mb-4 position-relative"
                                            style={{ height: "9rem" }}>
                                            <h1 className="text-white mb-4 fs-5">{brg.data.nama_barang}</h1>
                                            <p className="text-white fs-5 text-primary lh-lg position-absolute bottom-0">Rp. {brg.data.harga}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between mt-4 position-absolute bottom-0 start-0 end-0">
                                            <Link to={`/ubah_barang/${brg.id}`} className="change pb-2 link">
                                                <img src={Ubah} alt="Ubah Product" className="ms-5" />
                                            </Link>
                                            <Link className="delete link">
                                                <img src={Delete} alt="Hapus Product" className=" ms-5" />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Container>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    barang: state.data
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Products);