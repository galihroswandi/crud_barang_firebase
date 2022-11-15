import { storage } from "../../firebase";
import { getDownloadURL, getMetadata, ref, uploadBytes } from "firebase/storage";

export const postToFirebase = (dataImage) => (dispatch) => {
    const imageName = new Date().getTime();
    const imgRef = ref(storage, `Barang/${imageName.toString()}`);
    return new Promise((resolve, reject) => {
        uploadBytes(imgRef, dataImage)
            .then(() => {
                // getDownloadURL(imgRef)
                //     .then(imgUrl => {
                //         resolve(imgUrl);
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     })
                getMetadata(imgRef)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log('Error => ', err);
                    })
            })
            .catch(err => {
                console.log(err);
                reject(false);
            })
    })
}