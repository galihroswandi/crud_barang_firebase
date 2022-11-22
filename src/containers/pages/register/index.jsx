import './register.css';
import { Component } from "react";
import { connect } from 'react-redux';
import { registerUserAPI } from "../../../config/redux/actions";
import Button from '../../../components/atoms/Button';
import Background from './../../../assets/img/bg-login.jpg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class Register extends Component {

    state = {
        email: '',
        password: '',
    }

    componentDidMount() {
        document.title = 'CRUDApps - Register';
        const dataUser = JSON.parse(localStorage.getItem("User"));
        if (dataUser) {
            document.location.href = '/login';
        }
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmitChange = async () => {
        const { email, password } = this.state;
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data cannot be empty',
            })
        } else {
            const response = await this.props.registerApi({ email, password }).catch(err => err);
            if (response) {
                this.setState({
                    email: '',
                    password: '',
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your registration is successful',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Your register failed',
                })
            }
        }
    }

    render() {
        const props = this.props;
        return (
            // <div className="container">
            //     <div className="registerWrapper">
            //         <div className="header">
            //             <h1>Sign Up</h1>
            //         </div>
            //         <div className="body">
            //             <div className="email">
            //                 <input type="email" name="email" id="email" placeholder="Email" autoComplete='off' onChange={this.handleChangeText} />
            //             </div>
            //             <div className="password">
            //                 <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChangeText} />
            //             </div>
            //             <div className="button">
            //                 <Button onClick={this.handleSubmitChange} title="Register" loading={props.loading} />
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="login-wrapper d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${Background})` }}>
                <div className="registerWrapper py-2 px-3">
                    <div className="header pt-3 mb-4">
                        <h1 className="text-white fw-bold text-center fs-1">Sign Up</h1>
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
                            <Button onClick={this.handleSubmitChange} title="SignUp" loading={props.loading} />
                            <hr className="hr" />
                            <Link to='/login' className="create-account btn py-2 px-3 fs-6">
                                Login
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
    registerApi: (data) => dispatch(registerUserAPI(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);