import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import UserService from "../services/UserService";

class RegisterPage extends React.Component {

    // TODO: disallow the empty fields
    // TODO: prevent the duplicate username on the server side
    // TODO: verification of password

    state = {
        userId: '',
        username: '',
        password: '',
        password2: '',
        type: 'CUSTOMER',
        email: '',
        firstName: '',
        lastName: '',
        location: ''
    }

    handleRegister = (user) => {
        if (!this.validateFields()) {
            alert("ERROR: All fields must be filled")
        }
        else if (!this.verifyPassword()) {
            alert("ERROR: Your passwords do not match")
        }
        else {
            // newUser has an id inserted by server
            UserService.register(user)
                // history.push: programmatically navigate to profile after we successfully register
                .then(newUser => (!newUser) ? alert("ERROR: This username already exists") : this.props.history.push('/profile'))
        }
    }

    validateFields = () =>
        !(this.state.username === '' || this.state.password === '' || this.state.password2 === '')

    verifyPassword = () =>
        this.state.password === this.state.password2


    render() {
        return (
            <div>

                <h1>Sign Up</h1>
                <div className="form-group row">
                    {/*Username field*/}
                    <label htmlFor="username-fld" className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="username-fld"
                               placeholder="New username"
                               value={this.state.username}
                               onChange={(e) =>
                                   this.setState({username: e.target.value})
                               }
                        />
                    </div>
                </div>

                {/*Password field*/}
                <div className="form-group row">
                    <label htmlFor="password-fld" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="password"
                            id="password-fld"
                            placeholder="*******"
                            value={this.state.password}
                            onChange={(e) =>
                                this.setState({password: e.target.value})
                            }
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="verify-fld" className="col-sm-2 col-form-label">Verify
                        Password</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="password"
                            id="verify-fld"
                            placeholder="*******"
                            onChange={(e) =>
                                this.setState({password2: e.target.value})
                            }
                        />
                    </div>
                </div>

                {/*Usertype dropdown*/}
                <div className="form-group row">
                    <label htmlFor="usertype-fld" className="col-sm-2 col-form-label">Choose user type</label>
                    <div className="col-sm-10">

                        <select id="usertype-fld"
                                className="form-control"
                                value={this.state.type}
                                onChange={(e) =>
                                    this.setState({type: e.target.value})}>

                            {/*CUSTOMER is the default type*/}
                            <option value="CUSTOMER">Customer</option>
                            <option value="DELIVERER">Deliverer</option>
                            <option value="ADMIN">Admin</option>

                        </select>

                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">

                        <button onClick={() => this.handleRegister(this.state)}
                                className="btn btn-success btn-block">
                            Sign up
                        </button>

                        {/*Cancel link*/}
                        <Link to={`/home`} className="btn btn-danger btn-block">
                            Cancel
                        </Link>

                    </div>
                </div>

            </div>

        )
    }

}

export default RegisterPage;
