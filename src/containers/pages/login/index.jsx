import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import "./login.css";
import Button from './../../../components/atoms/Button';
import { loginUserAPI } from './../../../config/redux/actions/index';
import Background from './../../../assets/img/bg-login.jpg';
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'CRUDApps - Login';
        const dataUser = JSON.parse(localStorage.getItem("User"));
        if (dataUser) {
            navigate('/');
        }
    })

    const handleChangeText = (e, type) => {
        switch (type) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                setPassword('');
                setEmail('');
                break;
        }
    }

    const handleSubmitChange = async () => {
        const response = await props.loginUserAPI({ email, password }).catch(err => err);
        if (response) {
            localStorage.setItem('User', JSON.stringify(response));
            navigate('/');
            handleChangeText();
        } else {
            setLogin(false);
        }
    }

    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${Background})` }}>
            <div className="registerWrapper py-2 px-3">
                <div className="header pt-3 mb-4">
                    <h1 className="text-white fw-bold text-center fs-1">Sign In</h1>
                </div>
                <div className="message-wrapper d-flex justify-content-center">
                    <div className="message" style={{ width: '80%', display: `${login ? 'none' : 'block'}` }}>
                        <p><i>Wrong username / password</i></p>
                    </div>
                </div>
                <div className="body-login d-flex justify-content-center flex-column align-items-center d-grid gap-3">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            autoComplete="off"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => handleChangeText(e, 'email')}
                        />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            autoComplete="off"
                            placeholder="Email"
                            value={password}
                            onChange={(e) => handleChangeText(e, 'password')}
                        />
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <div className="button d-flex flex-column align-items-center text-center mb-4">
                        <Button onClick={handleSubmitChange} title="Login" loading={props.loading} />
                        <hr className="hr" />
                        <Link to='/register' className="create-account btn py-2 px-3 fs-6">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
    loginUserAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);