import React from "react";
import {Link} from "react-router-dom";


const LoginPage = () =>
    <div>
        <h1>Sign In</h1>

        {/*Username field*/}
        <div className="form-group row">
            <label htmlFor="username-fld" className="col-sm-2 col-form-label">
                Username
            </label>
            <div className="col-sm-10">
                <input className="form-control" id="username-fld"
                       placeholder="Your username"/>
            </div>
        </div>

        {/*Password field*/}
        <div className="form-group row">
            <label htmlFor="password-fld" className="col-sm-2 col-form-label">
                Password
            </label>
            <div className="col-sm-10">
                <input className="form-control" type="password" id="password-fld"/>
            </div>
        </div>

        {/*Usertype dropdown*/}
        <div className="form-group row">
            <label htmlFor="usertype-fld" className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
                <select id="usertype-fld" className="form-control">
                    <option value="CUSTOMER">Customer</option>
                    <option value="DELIVERER">Deliverer</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
        </div>


        <div className="form-group row">

            <label className="col-sm-2 col-form-label"/>
            <div className="col-sm-10">
                {/*Sign in link*/}
                <Link to={`/profile`} className="btn btn-success btn-block">
                    Sign in
                </Link>
                {/*Cancel link*/}
                <Link to={`/`} className="btn btn-danger btn-block">
                    Cancel
                </Link>

                <div className="row">
                    {/*Forgot password link*/}
                    <div className="col-6">
                        <a href="#" className="float-left">Forgot Password?</a>
                    </div>
                    {/*Sign up link*/}
                    <div className="col-6">
                        <Link to={`/register`} className="float-right">Sign Up</Link>
                    </div>

                </div>
            </div>

        </div>

    </div>



export default LoginPage;
