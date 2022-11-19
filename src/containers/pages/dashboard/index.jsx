import React, { Component } from "react";
import "./dashboard.css";
import { connect } from "react-redux";
import { DeleteDataFromAPI, GetDataFromAPI } from "./../../../config/redux/actions";
import { deleteImgFromAPI } from "../../../config/redux/actions/postImage";
import Header from "../../../components/molecule/header";
import BodyComponent from "../../../components/molecule/body";

class Dashboard extends Component {

    componentDidMount() {
        const dataUser = JSON.parse(localStorage.getItem("User"));
        const { GetDataFromAPI } = this.props;
        document.title = "CRUDApps - Dashboard";
        GetDataFromAPI(dataUser.uid);
    }

    handleDelete = async (id, img) => {
        const { DeleteDataFromAPI, DeleteImg } = this.props;
        const dataUser = JSON.parse(localStorage.getItem('User'));
        const data = {
            userId: dataUser.uid,
            barangId: id
        }
        if (window.confirm('Apakah Yakin Ingin Menghapus ?')) {
            await DeleteDataFromAPI(data).then(() => {
                DeleteImg(img)
            })
        }
    }

    render() {
        const { barang } = this.props;
        const { handleDelete } = this;
        return (
            <div className="component-wrapper mb-5">
                <Header />
                <BodyComponent />
                {/* <div className="container d-flex flex-column">
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
                                    <div className="btn-del position-absolute end-0 top-0 fs-5 fw-bold py-0 px-2 text-white" onClick={() => handleDelete(brg.id, brg.data.img.imgName)}>
                                        X
                                    </div>
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
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    barang: state.data,
});

const mapDispatchToProps = (dispatch) => ({
    GetDataFromAPI: (userId) => dispatch(GetDataFromAPI(userId)),
    DeleteDataFromAPI: (data) => dispatch(DeleteDataFromAPI(data)),
    DeleteImg: (img) => dispatch(deleteImgFromAPI(img))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
