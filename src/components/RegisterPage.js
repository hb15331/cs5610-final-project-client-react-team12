import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const RegisterPage = () =>
    <div>

        <h1>Sign Up</h1>
        <div className="form-group row">
            {/*Username field*/}
            <label htmlFor="username-fld" className="col-sm-2 col-form-label">
                Username
            </label>
            <div className="col-sm-10">
                <input className="form-control" id="username-fld"
                       placeholder="alice"/>
            </div>
        </div>

        {/*Password field*/}
        <div className="form-group row">
            <label htmlFor="password-fld" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input className="form-control" type="password" id="password-fld"/>
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
                {/*Sign up link*/}
                <Link to={`/profile`} className="btn btn-success btn-block">
                    Sign up
                </Link>
                {/*Cancel link*/}
                <Link to={`/profile`} className="btn btn-danger btn-block">
                    Cancel
                </Link>

            </div>
        </div>

    </div>



export default RegisterPage;


// import React from 'react'
// import {Link} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"
//
// // const APP_ID = "e488ff8f"
// // const APP_KEY = "922801bd953e0343123e19348ba693fe"
// // const RECIPE_URL = "https://api.edamam.com/search"
//
// class RegisterPage extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//             <div>
//
//
//                 <h5>Profile</h5>
//                 <span //TODO: add edit buttons
//                 >
//
//                 <label for = "name">Name</label>
//                 <input className="form-control" type="text" id="name"
//                     //TODO: onchange input username
//                 />
//
//                 </span>
//                 <label for="name">Email</label>
//                 <input className="form-control" type="email" id="name"
//                     //TODO: onchange input username
//                 />
//                 <label for="telephone">Telephone</label>
//                 <input className="form-control" type="tel" id="telephone"
//                     //TODO: onchange input password
//                 />
//                 <label for="location">Location</label>
//                 <input className="form-control" type="text" id="location"
//                     //TODO: onchange input password
//                 />
//
//                 <label for="orderlist">Orders:</label>
//                 <ul id="orderlist">
//
//                 </ul>
//
//
//
//
//             </div>
//
//         )
//     }
// }
//
//
// export default RegisterPage;
