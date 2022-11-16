import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
    GetSingleData,
    UpdateDataFromAPI,
} from "../../../config/redux/actions";

const UbahBarang = ({ getSingleData, saveUpdate }) => {
    let { id } = useParams();
    const [change, setChange] = useState(false);
    const [namaBarang, setNamaBarang] = useState();
    const [jumlah, setJumlah] = useState();
    const [img, setImg] = useState();
    const [harga, setHarga] = useState();
    const [desc, setDesc] = useState();
    const [idBarang, setIdBarang] = useState();

    useEffect(() => {
        const dataUser = JSON.parse(localStorage.getItem("User"));
        getSingleData(id.toString(), dataUser.uid.toString()).then(
            (response) => {
                if (change == false) {
                    setNamaBarang(response.nama_barang);
                    setJumlah(response.jumlah);
                    setImg(response.img);
                    setHarga(response.harga);
                    setDesc(response.desc);
                    setIdBarang(response.id_barang);
                }
            }
        );
    });

    const handleSubmit = () => {
        const dataUser = JSON.parse(localStorage.getItem('User'));
        const data = {
            nama_barang: namaBarang,
            harga: harga,
            jumlah: jumlah,
            desc: desc,
            img: img,
            userId : dataUser.uid,
            barangId : idBarang
        };
        // saveUpdate(data).then((response) => {
        //     console.log(response);
        // });
        // setChange(false);
    };

    return (
        <div className="container mb-5">
            <div className="wrapper">
                <div className="header">
                    <h1>Ubah Barang</h1>
                </div>
                <div className="body">
                    <div className="form-label">
                        <label htmlFor="nm_brg">Nama Barang</label>
                        <input
                            type="text"
                            name="nama"
                            id="nm_brg"
                            autoComplete="off"
                            value={namaBarang}
                            onChange={(e) => {
                                setChange(true);
                                return setNamaBarang(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="jumlah">Jumlah</label>
                        <input
                            type="text"
                            name="jumlah"
                            id="jumlah"
                            autoComplete="off"
                            value={jumlah}
                            onChange={(e) => {
                                setChange(true);
                                return setJumlah(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-label">
                        <label htmlFor="harga">Harga</label>
                        <input
                            type="text"
                            name="harga"
                            id="harga"
                            autoComplete="off"
                            value={harga}
                            onChange={(e) => {
                                setChange(true);
                                return setHarga(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-text mb-3">
                        <label htmlFor="desc">Deskripsi</label>
                        <textarea
                            name="desc"
                            id="desc"
                            cols="30"
                            rows="10"
                            value={desc}
                            onChange={(e) => {
                                setChange(true);
                                return setDesc(e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="form-text d-flex flex-column mb-3">
                        <label htmlFor="desc">Gambar</label>
                        <img
                            src={img}
                            alt="Image Error"
                            style={{ width: "10rem" }}
                        />
                        <input
                            type="file"
                            name="image"
                            id="image"
                            autoComplete="off"
                        />
                    </div>
                    <div className="button">
                        <button type="submit" onClick={() => handleSubmit()}>
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    getSingleData: (id, userId) => dispatch(GetSingleData(id, userId)),
    saveUpdate: (data) => dispatch(UpdateDataFromAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UbahBarang);
