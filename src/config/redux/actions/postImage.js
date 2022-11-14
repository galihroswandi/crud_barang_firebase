import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes, listAll, list } from "firebase/storage";

export const postToFirebase = (dataImage) => (dispatch) => {
    const imageName = new Date().getTime();
    const imgRef = ref(storage, `Barang/${imageName.toString()}`);
    return new Promise((resolve, reject) => {
        uploadBytes(imgRef, dataImage)
            .then(response => {
                dispatch({ type: 'SET_IMAGE', value: imageName });
                resolve(true);
            })
            .catch(err => {
                console.log(err);
                reject(false);
            })
    })
}

export const getBarangFromAPI = () => (dispatch) => {
    const imageRef = ref(storage, `Barang/`);
    list(imageRef, { maxResult: 100 })
        .then(response => {
            const result = [];
            response.items.forEach(item => {
                result.push(item.name);
            })

            const gambar = [];
            for(let i = 0; i < result.length; i++){
                let imageRef = ref(storage, `Barang/${result[i]}`);
                getDownloadURL(imageRef)
                .then(response => {
                    gambar.push({id : result[i], img : response});
                })
            }
            dispatch({type : "SET_IMAGE", value : gambar});
        })

    // const imageRef = ref(storage, `Barang/${item.name}`);
    // getDownloadURL(imageRef)
    //     .then(res => {
    //         Object.keys(res).map(data => {
    //             result.push({
    //                 id: item.name,
    //                 image: data
    //             })
    //         })
    //     })
    //     getDownloadURL(imageRef)
    //         .then(response => {
    //             const result = [];
    //             Object.keys(response).map(res => {
    //                 result.push({
    //                     id : uid,
    //                     image : response
    //                 })
    //             })
    //             dispatch({type : 'SET_IMAGE', value : result})
    //         })
    //         .catch(err => err)
}