import React, { Component, useEffect, useState } from "react";
import "./products.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ubah from './../../../../assets/icons/ubah.svg';
import Delete from "./../../../../assets/icons/delete.svg";
import Plus from "./../../../../assets/icons/plus.svg";
import { connect } from "react-redux";
import { GetDataFromAPI } from "../../../../config/redux/actions";

// const Products = (props) => {
//     return (
//         <div className="products-wrapper mt-5 mb-5" id="products">
//             <Container>
//                 <Container fluid>
//                     <div className="row">
//                         <div className="col-6 mt-4">
//                             <h1 className="text-white fw-semibold">Products</h1>
//                         </div>
//                         <div className="col-6 d-flex justify-content-end">
//                             <Link to="/tambah_brg" className="btn btn-primary d-flex justify-content-center align-items-center" style={{ height: '2.5rem' }}>
//                                 <img src={Plus} alt="Tambah Barang" className="me-2" />
//                                 <span>Tambah barang</span>
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="row d-flex flex-wrap justify-content-center target-data">
//                         {/* <div key={key} className="card-wrapper col-2 ms-5 mt-5 cardComp px-0 position-relative overflow-hidden" style={{ maxHeight: '25rem' }}>
//                             <div
//                                 className="card-header"
//                                 style={{
//                                     minHeight: "14rem",
//                                     width: '100%',
//                                     backgroundImage: `url(${brg.data.img.imgUrl})`,
//                                     backgroundRepeat: 'no-repeat',
//                                     backgroundSize: '99% 99%',
//                                     backgroundPosition: 'center center'
//                                 }}
//                             />
//                             <div className="card-body px-3 mb-4 pt-3 position-relative pt-2 border-box"
//                                 style={{ height: "9rem", borderTop: '.01rem solid var(--primary-color)' }}>
//                                 <h1 className="text-white fs-6">{brg.data.nama_barang}</h1>
//                                 <p className="text-white fs-5 text-primary lh-lg position-absolute bottom-0" style={{ top: '3.5rem' }}>Rp. {brg.data.harga}</p>
//                             </div>
//                             <div className="card-footer d-flex justify-content-between mt-4 position-absolute bottom-0 start-0 end-0">
//                                 <Link to={`/ubah_barang/${brg.id}`} className="change py-2 link">
//                                     <img src={Ubah} alt="Ubah Product" className="ms-5" />
//                                 </Link>
//                                 <div className="delete link py-2" onClick={() => props.handleDelete(brg.id, brg.data.img.imgName)}>
//                                     <img src={Delete} alt="Hapus Product" className=" ms-5" />
//                                 </div>
//                             </div>
//                         </div> */}
//                     </div>
//                 </Container>
//             </Container>
//         </div >
//     )
// }

class Products extends Component {

    componentDidMount() {
        this.props.GetDataAPI(this.props.user_id);
    }

    render() {

        const { barang, handleDelete } = this.props;

        return (
            <div className="products-wrapper mt-5 mb-5" id="products">
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
                        <div className="row d-flex flex-wrap justify-content-center target-data">
                            {
                                barang.map((brg, key) => {
                                    return (
                                        <div key={key} className="card-wrapper col-2 ms-5 mt-5 cardComp px-0 position-relative overflow-hidden" style={{ maxHeight: '25rem' }}>
                                            <div
                                                className="card-header"
                                                style={{
                                                    minHeight: "14rem",
                                                    width: '100%',
                                                    backgroundImage: `url(${brg.data.img.imgUrl})`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '99% 99%',
                                                    backgroundPosition: 'center center'
                                                }}
                                            />
                                            <div className="card-body px-3 mb-4 pt-3 position-relative pt-2 border-box"
                                                style={{ height: "9rem", borderTop: '.01rem solid var(--primary-color)' }}>
                                                <h1 className="text-white fs-6">{brg.data.nama_barang}</h1>
                                                <p className="text-white fs-5 text-primary lh-lg position-absolute bottom-0" style={{ top: '3.5rem' }}>Rp. {brg.data.harga}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between mt-4 position-absolute bottom-0 start-0 end-0">
                                                <Link to={`/ubah_barang/${brg.id}`} className="change py-2 link">
                                                    <img src={Ubah} alt="Ubah Product" className="ms-5" />
                                                </Link>
                                                <div className="delete link py-2" onClick={() => handleDelete(brg.id, brg.data.img.imgName)}>
                                                    <img src={Delete} alt="Hapus Product" className=" ms-5" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Container>
                </Container>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    barang: state.data
})

const mapDispatchToProps = (dispatch) => ({
    GetDataAPI: (user_id) => dispatch(GetDataFromAPI(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);