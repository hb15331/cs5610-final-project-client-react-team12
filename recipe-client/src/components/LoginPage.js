import React from "react";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";


class LoginPage extends React.Component {

    // TODO: implement a login validation
    // TODO: block the login and register if the user is logged in

    state = {
        username: '',
        password: '',
    }

    handleLogin = (user) =>
        UserService.login(user)
            .then(currentUser =>
                (!currentUser) ?
                    alert("Error: Your login details fail to match our record") :
                    this.props.history.push('/profile'))


    render() {
        return (
            <div>
                <h1>Sign In</h1>

                {/*Username field*/}
                <div className="form-group row">
                    <label htmlFor="username-fld" className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="username-fld"
                               placeholder="Your username"
                               value={this.state.username}
                               onChange={(e) =>
                                   this.setState({username: e.target.value})}
                        />
                    </div>
                </div>

                {/*Password field*/}
                <div className="form-group row">
                    <label htmlFor="password-fld" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               type="password"
                               id="password-fld"
                               value={this.state.password}
                               onChange={(e) =>
                                   this.setState({password: e.target.value})}
                        />
                    </div>
                </div>

                {/*Usertype dropdown*/}
                {/*<div className="form-group row">*/}
                {/*    <label htmlFor="usertype-fld" className="col-sm-2 col-form-label"></label>*/}

                {/*    <div className="col-sm-10">*/}

                {/*        <select id="usertype-fld"*/}
                {/*                className="form-control"*/}
                {/*                value={this.state.type}*/}
                {/*                onChange={(e) =>*/}
                {/*                    this.setState({type: e.target.value})}>*/}
                {/*            <option value="CUSTOMER">Customer</option>*/}
                {/*            <option value="DELIVERER">Deliverer</option>*/}
                {/*            <option value="ADMIN">Admin</option>*/}
                {/*        </select>*/}

                {/*    </div>*/}
                {/*</div>*/}


                <div className="form-group row">

                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">

                        {/*Sign in link*/}
                        <button className="btn btn-success btn-block"
                                onClick={() => this.handleLogin(this.state)}>
                            Sign in
                        </button>

                        {/*Cancel link*/}
                        <Link to={`/`} className="btn btn-danger btn-block">
                            Cancel
                        </Link>

                        <div className="row">
                            {/*Forgot password link*/}
                            {/*<div className="col-6">*/}
                            {/*    <a href="#" className="float-left">Forgot Password?</a>*/}
                            {/*</div>*/}

                            {/*Sign up link*/}
                            <div className="col-6">
                                <Link to={`/register`}>Sign Up</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default LoginPage
