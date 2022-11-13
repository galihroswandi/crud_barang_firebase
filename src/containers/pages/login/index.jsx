import React, { Component } from "react";
import "./login.css";
import { connect } from 'react-redux';
import Button from './../../../components/atoms/Button';
import { loginUserAPI } from './../../../config/redux/actions/index';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitChange = async () => {
        const {email, password} = this.state;
        const response = await this.props.loginUserAPI({email, password}).catch(err => err);
        if( response ){
            this.setState({
                email : "",
                password : ""
            })
            localStorage.setItem('User', JSON.stringify(response));
            window.location.href = '/';
            // localStorage.clear();
        }else{
            console.log(response);
        }
    }

    render() {
        const props = this.props;
        return (
            <div className="container">
                <div className="registerWrapper">
                    <div className="header">
                        <h1>Sign In</h1>
                    </div>
                    <div className="body">
                        <div className="email">
                            <input type="email" name="email" id="email" placeholder="Email" autoComplete='off' onChange={this.handleChangeText} />
                        </div>
                        <div className="password">
                            <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChangeText} />
                        </div>
                        <div className="button">
                            <Button onClick={this.handleSubmitChange} title="Login" loading={props.loading} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading,
})

const mapDispatchToProps = (dispatch) => ({
    loginUserAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);