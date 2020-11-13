import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// const APP_ID = "e488ff8f"
// const APP_KEY = "922801bd953e0343123e19348ba693fe"
// const RECIPE_URL = "https://api.edamam.com/search"

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>


                <h5>Profile</h5>
                <span //TODO: add edit buttons
                >

                <label for = "name">Name</label>
                <input className="form-control" type="text" id="name"
                    //TODO: onchange input username
                />

                </span>
                <label for="name">Email</label>
                <input className="form-control" type="email" id="name"
                    //TODO: onchange input username
                />
                <label for="telephone">Telephone</label>
                <input className="form-control" type="tel" id="telephone"
                    //TODO: onchange input password
                />
                <label for="location">Location</label>
                <input className="form-control" type="text" id="location"
                    //TODO: onchange input password
                />

                <label for="orderlist">Orders:</label>
                <ul id="orderlist">

                </ul>




            </div>

        )
    }
}


export default RegisterPage;