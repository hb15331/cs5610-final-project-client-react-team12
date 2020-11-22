import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import userService from "../services/UserService";

let userName, password, type;
const RegisterPage = (
    {
        users=[],
        createUsers
    }) =>
    <div>

        <h1>Sign Up</h1>
        <div className="form-group row">
            {/*Username field*/}
            <label htmlFor="username-fld" className="col-sm-2 col-form-label">
                Username
            </label>
            <div className="col-sm-10">
                <input className="form-control" id="username-fld"
                       placeholder="alice"
                       onChange={e =>
                           userName= e.target.value}
                />
            </div>
        </div>

        {/*Password field*/}
        <div className="form-group row">
            <label htmlFor="password-fld" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input className="form-control" type="password" id="password-fld"
                       onChange={e =>
                           password= e.target.value}
                />
            </div>
        </div>

        <div className="form-group row">
            <label htmlFor="verify-fld" className="col-sm-2 col-form-label">Verify Password</label>
            <div className="col-sm-10">
                <input className="form-control" type="password" id="verify-fld"/>
            </div>
        </div>

        {/*Usertype dropdown*/}
        <div className="form-group row">
            <label htmlFor="usertype-fld" className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
                <select id="usertype-fld" className="form-control"
                        onChange={e =>
                            type= e.target.value}
                >
                    <option value="CUSTOMER">Customer</option>
                    <option value="DELIVERER">Deliverer</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
        </div>


        <div className="form-group row">
            <label className="col-sm-2 col-form-label"/>
            <div className="col-sm-10">
                {/*Sign up link*/}
                {/*<Link to={`/profile`} >*/}
                    <button className="btn btn-success btn-block"
                            onClick={()=>createUsers(userName,password,type)}>
                    Sign up
                    </button>
                {/*</Link>*/}
                {/*Cancel link*/}
                <Link to={`/home`} className="btn btn-danger btn-block">
                    Cancel
                </Link>

            </div>
        </div>

    </div>

const stateToPropertyMapper = (state) => ({
    users: state.userReducer.users
})

const dispatchToPropertyMapper = (dispatch) => ({

    createUsers: (userName, password, type) =>
        userService.createUser({username: userName, password: password, type: type})
            .then(actualUser => dispatch({
                type: "CREATE_USERS",
                user: actualUser
            }))
})

export default connect
(stateToPropertyMapper,
    dispatchToPropertyMapper())
(RegisterPage)

