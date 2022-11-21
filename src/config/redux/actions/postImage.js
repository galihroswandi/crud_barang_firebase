import { storage } from "../../firebase";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const postToFirebase = (dataImage) => (dispatch) => {
    const imageName = new Date().getTime();
    const imgRef = ref(storage, `Barang/${imageName.toString()}`);
    dispatch({ type: 'CHANGE_LOADING', value: true })
    return new Promise((resolve, reject) => {
        uploadBytes(imgRef, dataImage)
            .then(() => {
                getDownloadURL(imgRef)
                    .then(imgUrl => {
                        const data = {
                            imgName: imageName,
                            imgUrl: imgUrl
                        }
                        resolve(data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
                reject(false);
            })
    })
}

export const deleteImgFromAPI = (imgLama) => (dispatch) => {
    const storage = getStorage();
    const desertRef = ref(storage, `Barang/${imgLama}`);
    return new Promise((resolve, reject) => {
        deleteObject(desertRef)
            .then(() => {
                resolve(true);
                dispatch({ type: 'CHANGE_LOADING', value: false })
            })
            .catch(err => {
                reject(err)
                dispatch({ type: 'CHANGE_LOADING', value: false })
            })
    })
}