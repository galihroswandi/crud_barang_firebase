import React, { Component } from "react";
import { connect } from 'react-redux';
import "./login.css";
import Button from './../../../components/atoms/Button';
import { loginUserAPI } from './../../../config/redux/actions/index';
import Background from './../../../assets/img/bg-login.jpg';
import { Link } from "react-router-dom";

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        document.title = 'CRUDApps - Login';
        const dataUser = JSON.parse(localStorage.getItem("User"));
        if (dataUser) {
            document.location.href = '/';
        }
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitChange = async () => {
        const { email, password } = this.state;
        const response = await this.props.loginUserAPI({ email, password }).catch(err => err);
        if (response) {
            this.setState({
                email: "",
                password: ""
            })
            localStorage.setItem('User', JSON.stringify(response));
            window.location.href = '/';
        } else {
            console.log(response);
        }
    }

    render() {
        const props = this.props;
        return (
            <div className="login-wrapper d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${Background})` }}>
                <div className="registerWrapper py-2 px-3">
                    <div className="header pt-3 mb-4">
                        <h1 className="text-white fw-bold text-center fs-1">Sign In</h1>
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
                                value={this.state.email}
                                onChange={this.handleChangeText}
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
                                value={this.state.password}
                                onChange={this.handleChangeText}
                            />
                            <label htmlFor="floatingInput">Password</label>
                        </div>
                        <div className="button d-flex flex-column align-items-center text-center mb-4">
                            <Button onClick={this.handleSubmitChange} title="Login" loading={props.loading} />
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
}

const mapStateToProps = (state) => ({
    loading: state.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
    loginUserAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);