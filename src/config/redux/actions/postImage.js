import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

const postToFirebase = (dataImage) => (dispatch) => {
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

export default postToFirebase;