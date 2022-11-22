import React, { Component } from "react";
import { connect } from "react-redux";
import { postDataAPI } from "../../../config/redux/actions";
import { postToFirebase } from "../../../config/redux/actions/postImage";
import NavbarComponent from "../../../components/molecule/header/navbar";
import { Container, Row } from "react-bootstrap";
import FormComponent from "../../../components/atoms/form";
import FooterComponent from "../../../components/molecule/footer";
import Swal from "sweetalert2";

class TambahBarang extends Component {

    state = {
        nama: '',
        jumlah: '',
        harga: '',
        desc: '',
        image: ''
    }

    componentDidMount() {
        document.title = "CRUDApps - Add Product";
        const dataUser = JSON.parse(localStorage.getItem("User"));
        if (!dataUser) {
            document.location.href = '/login';
        }
    }

    handleSubmit = async () => {
        const { nama, jumlah, harga, desc, image } = this.state;
        const { postAPI, postImage } = this.props;

        const dataUser = JSON.parse(localStorage.getItem('User'));

        // Tambahkan Data Ke Firebase Storage
        await postImage(image)
            .then(response => {
                const data = {
                    userId: dataUser.uid,
                    id_barang: new Date().getTime(),
                    nama_barang: nama,
                    jumlah: jumlah,
                    harga: harga,
                    desc: desc,
                    img: {
                        imgName: response.imgName,
                        imgUrl: response.imgUrl
                    }
                }

                // Tambahkan Data Ke API
                postAPI(data)
                    .then(response => {
                        this.setState({
                            nama: '',
                            jumlah: '',
                            harga: '',
                            desc: '',
                            image: ''
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data added successfully',
                        })
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value,
        })
    }

    onFileChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }


    render() {
        return (
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <Container fluid>
                    <NavbarComponent />
                </Container>
                <FormComponent
                    onFileChange={(e) => this.onFileChange(e)}
                    onChange={(e, type) => this.onInputChange(e, type)}
                    state={this.state}
                    handleSubmit={() => this.handleSubmit()}
                />
                <footer>
                    <FooterComponent />
                </footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.user,
    image: state.image,
    Loading: state.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    postAPI: (data) => dispatch(postDataAPI(data)),
    postImage: (data) => dispatch(postToFirebase(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TambahBarang);