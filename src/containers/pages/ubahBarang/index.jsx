import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import FormComponent from "../../../components/atoms/form";
import FooterComponent from "../../../components/molecule/footer";
import {
    GetSingleData,
    UpdateDataFromAPI,
} from "../../../config/redux/actions";
import { deleteImgFromAPI, postToFirebase } from "../../../config/redux/actions/postImage";
import NavbarComponent from "./../../../components/molecule/header/navbar";
import Swal from "sweetalert2";

const UbahBarang = ({ getSingleData, saveUpdate, updateImg, deleteImgLama }) => {
    let { id } = useParams();
    const [change, setChange] = useState(false);
    const [namaBarang, setNamaBarang] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [imgLama, setImgLama] = useState('');
    const [imgLamaName, setImgLamaName] = useState('');
    const [newImg, setNewImg] = useState();
    const [harga, setHarga] = useState();
    const [desc, setDesc] = useState();
    const [idBarang, setIdBarang] = useState();

    useEffect(() => {
        document.title = "CRUDApps - Change Product"
        const dataUser = JSON.parse(localStorage.getItem("User"));
        getSingleData(id.toString(), dataUser.uid.toString()).then(
            (response) => {
                if (change == false) {
                    setNamaBarang(response.nama_barang);
                    setJumlah(response.jumlah);
                    setImgLama(response.img.imgUrl);
                    setImgLamaName(response.img.imgName);
                    setHarga(response.harga);
                    setDesc(response.desc);
                    setIdBarang(id);

                    setChange(true);
                }
            }
        );
    });

    const handleSubmit = async () => {
        const dataUser = JSON.parse(localStorage.getItem('User'));
        if (newImg) {
            await updateImg(newImg)
                .then(response => {
                    const data = {
                        nama_barang: namaBarang,
                        harga: harga,
                        jumlah: jumlah,
                        desc: desc,
                        userId: dataUser.uid,
                        barangId: idBarang,
                        img: {
                            imgName: response.imgName,
                            imgUrl: response.imgUrl
                        }

                    };
                    saveUpdate(data).then((response) => {
                        deleteImgLama(imgLamaName).then(result => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Data changed successfully',
                            })
                            setNamaBarang('');
                            setJumlah('');
                            setHarga('');
                            setImgLama('');
                            setDesc('');
                        })
                    });
                })
        } else {
            const data = {
                nama_barang: namaBarang,
                harga: harga,
                jumlah: jumlah,
                desc: desc,
                userId: dataUser.uid,
                barangId: idBarang,
                img: {
                    imgName: imgLamaName,
                    imgUrl: imgLama
                }
            };
            saveUpdate(data).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data changed successfully',
                })
                setNamaBarang('');
                setJumlah('');
                setHarga('');
                setImgLama('');
                setDesc('');
            })
        }
    };

    const handleChange = (e, type) => {
        switch (type) {
            case 'nama':
                setNamaBarang(e.target.value);
                break;
            case 'jumlah':
                setJumlah(e.target.value);
                break;
            case 'harga':
                setHarga(e.target.value);
                break;
            case 'desc':
                setDesc(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div className="container mb-5 d-flex flex-column">
            <Container fluid>
                <NavbarComponent />
            </Container>
            <FormComponent
                handleSubmit={handleSubmit}
                onChange={(e, type) => handleChange(e, type)}
                title="Change Product"
                nama_barang={namaBarang}
                jumlah={jumlah}
                harga={harga}
                imgLama={imgLama}
                newImg={(img) => setNewImg(img)}
                desc={desc}
            />
            <footer>
                <FooterComponent />
            </footer>
        </div>
    );
};

const mapStateToProps = (state) => ({
    data: state.product
});

const mapDispatchToProps = (dispatch) => ({
    getSingleData: (id, userId) => dispatch(GetSingleData(id, userId)),
    saveUpdate: (data) => dispatch(UpdateDataFromAPI(data)),
    updateImg: (data) => dispatch(postToFirebase(data)),
    deleteImgLama: (imgLama) => dispatch(deleteImgFromAPI(imgLama)),
    setProduct: (data) => dispatch({ type: 'SET_PRODUCT', value: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(UbahBarang);
