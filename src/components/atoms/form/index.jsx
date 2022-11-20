import React, { useState } from "react";
import "./form.css";
import Paperclip from "./../../../assets/icons/paperclip.svg";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const FormComponent = (props) => {

    const [image, setImage] = useState();

    const onFileChange = (e) => {
        const nameFile = e.target.files[0].name.toString();
        if (nameFile.length <= 20) {
            setImage(e.target.files[0].name)
            props.onFileChange(e)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Maximum of 20 characters'
            });
        }
    }

    return (
        <div className="form-wrapper-component mt-5 mb-5">
            <div className="header py-2 bg-primary-button">
                <h1 className="text-white fs-4 mt-1">Add Product</h1>
            </div>
            <div className="body px-5 mx-5">
                <div className="form-floating mb-4">
                    <input
                        type="text"
                        name="nama"
                        className="form-control"
                        id="nm_brg"
                        autoComplete="off"
                        placeholder="Nama Barang"
                        value={props.state.nama}
                        onChange={(e) => props.onChange(e, 'nama')}
                    />
                    <label htmlFor="floatingInput">Product Name</label>
                </div>
                <div className="form-floating mb-4">
                    <input
                        type="text"
                        name="nama"
                        className="form-control"
                        id="nm_brg" autoComplete="off"
                        placeholder="Nama Barang"
                        value={props.state.jumlah}
                        onChange={(e) => props.onChange(e, 'jumlah')}
                    />
                    <label htmlFor="floatingInput">Amount</label>
                </div>
                <div className="form-floating mb-4">
                    <input
                        type="text"
                        name="nama"
                        className="form-control"
                        id="nm_brg"
                        autoComplete="off"
                        placeholder="Nama Barang"
                        value={props.state.harga}
                        onChange={(e) => props.onChange(e, 'harga')}
                    />
                    <label htmlFor="floatingInput">Price</label>
                </div>
                <div className="form-floating mb-4">
                    <div className="form">
                        <label htmlFor="image">
                            <a className="btn text-dark" rel="nofollow">
                                <div className="px-2">
                                    <img src={Paperclip} alt="Insert Image" className="me-2" />
                                    <span>{image ? image : 'Insert Image'}</span>
                                </div>
                            </a>
                        </label>
                        <input type="file" name="image" id="image" style={{ display: 'none' }} onChange={(e) => onFileChange(e)} />
                    </div>
                </div>
                <div className="form-floating mb-5">
                    <textarea
                        className="form-control text-white"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        value={props.state.desc}
                        onChange={(e) => props.onChange(e, 'desc')}
                    ></textarea>
                    <label htmlFor="floatingTextarea" style={{ marginTop: '1rem' }}>Description</label>
                </div>
                <div className="button d-flex d-grid gap-4">
                    <a className="btn btn-primary py-2 fw-normal" onClick={props.handleSubmit}>Save</a>
                    <Link to="/" className="btn btn-danger">
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FormComponent;