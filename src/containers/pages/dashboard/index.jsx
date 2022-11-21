import React, { Component } from "react";
import "./dashboard.css";
import { connect } from "react-redux";
import { DeleteDataFromAPI, GetDataFromAPI } from "./../../../config/redux/actions";
import { deleteImgFromAPI } from "../../../config/redux/actions/postImage";
import Header from "../../../components/molecule/header";
import BodyComponent from "../../../components/molecule/body";
import FooterComponent from "../../../components/molecule/footer";
import Swal from 'sweetalert2';

class Dashboard extends Component {

    componentDidMount() {
        const dataUser = JSON.parse(localStorage.getItem("User"));
        const { GetDataFromAPI } = this.props;
        document.title = "CRUDApps - Dashboard";
        GetDataFromAPI(dataUser.uid);
    }

    handleDelete = async (id, img) => {
        await Swal.fire({
            title: 'Delete ?',
            text: "Deleting data will be permanent automatically",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8463EF',
            cancelButtonColor: '#DADEE0',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const { DeleteDataFromAPI, DeleteImg } = this.props;
                const dataUser = JSON.parse(localStorage.getItem('User'));
                const data = {
                    userId: dataUser.uid,
                    barangId: id
                }
                DeleteDataFromAPI(data).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    DeleteImg(img)
                })
            }
        })
    }

    render() {
        const { barang } = this.props;
        const { handleDelete } = this;
        return (
            <div className="component-wrapper mb-5">
                <Header />
                <BodyComponent handleDelete={(id, img) => handleDelete(id, img)} />
                <FooterComponent />
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
