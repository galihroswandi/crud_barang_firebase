import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import "./dashboard.css";
import { connect } from "react-redux";
import { DeleteDataFromAPI, GetDataFromAPI } from "./../../../config/redux/actions";
import { deleteImgFromAPI } from "../../../config/redux/actions/postImage";
import Header from "../../../components/molecule/header";
import BodyComponent from "../../../components/molecule/body";
import FooterComponent from "../../../components/molecule/footer";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";

// class Dashboard extends Component {

//     componentDidMount() {
//         const dataUser = JSON.parse(localStorage.getItem("User"));
//         if (!dataUser) {
//             document.location.href = '/login';
//         }
//         const { GetDataAPI } = this.props;
//         document.title = "CRUDApps - Dashboard";
//         GetDataAPI(dataUser.uid);
//     }

//     handleDelete = async (id, img) => {
//         await Swal.fire({
//             title: 'Delete ?',
//             text: "Deleting data will be permanent automatically",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#8463EF',
//             cancelButtonColor: '#DADEE0',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 const { DeleteDataFromAPI, DeleteImg } = this.props;
//                 const dataUser = JSON.parse(localStorage.getItem('User'));
//                 const data = {
//                     userId: dataUser.uid,
//                     barangId: id
//                 }
//                 DeleteDataFromAPI(data).then(() => {
//                     Swal.fire(
//                         'Deleted!',
//                         'Your file has been deleted.',
//                         'success'
//                     )
//                     DeleteImg(img)
//                 })
//             }
//         })
//     }

//     render() {
//         const { handleDelete } = this;
//         return (
//             <div className="component-wrapper mb-5">
//                 <Header />
//                 <BodyComponent handleDelete={(id, img) => handleDelete(id, img)} />
//                 <FooterComponent />
//             </div>
//         );
//     }
// }

const Dashboard = (props) => {

    const navigate = useNavigate();
    const [idUser, setIdUser] = useState('');

    useEffect(() => {
        const dataUser = JSON.parse(localStorage.getItem("User"));
        if (!dataUser) {
            navigate('/login');
        } else {
            setIdUser(dataUser.uid);
            document.title = "CRUDApps - Dashboard";
        }
    })

    const handleDelete = async (id, img) => {
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
                const { DeleteDataFromAPI, DeleteImg } = props;
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

    return (
        <div className="component-wrapper mb-5">
            <Header />
            <BodyComponent user_id={idUser} handleDelete={(id, img) => handleDelete(id, img)} />
            <FooterComponent />
        </div>
    )
}

const mapStateToProps = (state) => ({
    barang: state.data,
});

const mapDispatchToProps = (dispatch) => ({
    GetDataAPI: () => dispatch(GetDataFromAPI()),
    DeleteDataFromAPI: (data) => dispatch(DeleteDataFromAPI(data)),
    DeleteImg: (img) => dispatch(deleteImgFromAPI(img))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
