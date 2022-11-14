import React, { Component } from "react";
import { connect } from "react-redux";
import { postDataAPI } from "../../../config/redux/actions";
import {postToFirebase} from "../../../config/redux/actions/postImage";

class TambahBarang extends Component {

    state = {
        nama: '',
        jumlah: '',
        harga: '',
        desc: '',
        image: ''
    }

    handleSubmit = () => {
        const { nama, jumlah, harga, desc, image } = this.state;
        const { postAPI, postImage } = this.props;

        const dataUser = JSON.parse(localStorage.getItem('User'));

        postImage(image)
            .then(response => {
                const data = {
                    userId: dataUser.uid,
                    id_barang: new Date().getTime(),
                    nama_barang: nama,
                    jumlah: jumlah,
                    harga: harga,
                    desc: desc,
                    img: this.props.image
                }
                postAPI(data)
                .then(response => {
                    this.setState({
                        nama : '',
                        jumlah : '',
                        harga : '',
                        desc : '',
                        image : ''
                    })
                })
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
        const { nama, jumlah, harga, desc, image } = this.state;
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="header">
                        <h1>Tambah Barang</h1>
                    </div>
                    <div className="body">
                        <div className="form-label">
                            <label htmlFor="nm_brg">Nama Barang</label>
                            <input type="text" name="nama" id="nm_brg" autoComplete="off" value={nama} onChange={(e) => this.onInputChange(e, 'nama')} />
                        </div>
                        <div className="form-label">
                            <label htmlFor="jumlah">Jumlah</label>
                            <input type="text" name="jumlah" id="jumlah" autoComplete="off" value={jumlah} onChange={(e) => this.onInputChange(e, 'jumlah')} />
                        </div>
                        <div className="form-label">
                            <label htmlFor="harga">Harga</label>
                            <input type="text" name="harga" id="harga" autoComplete="off" value={harga} onChange={e => this.onInputChange(e, 'harga')} />
                        </div>
                        <div className="form-text">
                            <label htmlFor="desc">Deskripsi</label>
                            <textarea name="desc" id="desc" cols="30" rows="10" onChange={e => this.onInputChange(e, 'desc')} value={desc}></textarea>
                        </div>
                        <div className="form-text">
                            <label htmlFor="desc">Gambar</label>
                            <input type="file" name="image" id="image" autoComplete="off" onChange={this.onFileChange} />
                        </div>
                        <div className="button">
                            <button type="submit" onClick={this.handleSubmit}>Kirim</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.user,
    image: state.image
})

const mapDispatchToProps = (dispatch) => ({
    postAPI: (data) => dispatch(postDataAPI(data)),
    postImage: (data) => dispatch(postToFirebase(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TambahBarang);