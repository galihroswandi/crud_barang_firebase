import firebase from "./../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, onValue } from "firebase/database";

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth(firebase);
        dispatch({ type: "CHANGE_LOADING", value: true });
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                dispatch({ type: "CHANGE_LOADING", value: false });
                resolve(true);
            })
            .catch(() => {
                dispatch({ type: "CHANGE_LOADING", value: false });
                reject(false);
            });
    })
}

export const loginUserAPI = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        const auth = getAuth(firebase);
        dispatch({ type: "CHANGE_LOADING", value: true });
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                // Signed in 
                const user = {
                    email: response.user.email,
                    uid: response.user.uid,
                    emailVerfied: response.user.emailVerified,
                    reloadUserInfo: response.user.reloadUserInfo
                };

                dispatch({ type: "CHANGE_LOGIN", value: true });
                dispatch({ type: "CHANGE_LOADING", value: false });
                dispatch({ type: "CHANGE_USER", value: user });
                resolve(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_LOGIN', value: false })
                reject(false);
            });
    })
}

export const postDataAPI = (data) => (dispatch) => {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        push(ref(db, 'Barang/' + data.userId), {
            id_barang: data.id_barang,
            nama_barang: data.nama_barang,
            jumlah: data.jumlah,
            harga: data.harga,
            desc: data.desc,
            img: data.img
        })
            .then(() => {
                resolve(true);
            })
            .catch(() => {
                reject(false);
            })
    })
}

export const GetDataFromAPI = (userId) => (dispatch) => {
    const db = getDatabase();
    const linkRef = ref(db, `Barang/${userId}`);
    return new Promise((resolve, reject) => {
        onValue(linkRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
            const result = [];
            Object.keys(data).map(res => {
                result.push({
                    id: res,
                    data: data[res]
                })
            })
            dispatch({ type: "SET_DATA", value: result })
        });
    })
}
