import './register.css';
import { Component } from "react";
import { connect } from 'react-redux';
import { registerUserAPI } from "../../../config/redux/actions";
import Button from '../../../components/atoms/Button';

class Register extends Component {

    state = {
        email: '',
        password: '',
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmitChange = async () => {
        const { email, password } = this.state;
        const response = await this.props.registerApi({ email, password }).catch(err => err);
        if (response) {
            this.setState({
                email: '',
                password: '',
            })
            console.log('register success');
        } else {
            console.log('register failed');
        }
    }

    render() {
        const props = this.props;
        return (
            <div className="container">
                <div className="registerWrapper">
                    <div className="header">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="body">
                        <div className="email">
                            <input type="email" name="email" id="email" placeholder="Email" autoComplete='off' onChange={this.handleChangeText} />
                        </div>
                        <div className="password">
                            <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChangeText} />
                        </div>
                        <div className="button">
                            <Button onClick={this.handleSubmitChange} title="Register" loading={props.loading} />
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