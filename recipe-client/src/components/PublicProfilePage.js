import React from 'react'
import UserService from "../services/UserService";
import {Link} from "react-router-dom";


class PublicProfilePage extends React.Component {

    state = {
        // public info of other user
        publicInfo: {
            username: '',
            type: '',
            email: '',
            location: '',
        }
    }


    componentDidMount() {
        const userId = this.props.match.params.uid
        UserService.findPublicProfileById(userId)
            .then(publicInfo => this.setState({publicInfo: publicInfo}))
    }


    render() {
        return (
            <div>
                <h3>Profile (Public)</h3>

                {/*/!*UserId field*!/*/}
                {/*<label htmlFor="userId-fld">User Id</label>*/}
                {/*<input*/}
                {/*    className="form-control"*/}
                {/*    id="userId-fld"*/}
                {/*    value={this.state.publicInfo.userId}*/}
                {/*    onChange={() => {}}*/}
                {/*/>*/}

                {/*Username field*/}
                <label htmlFor="username-fld">Username</label>
                <input
                    className="form-control"
                    id="username-fld"
                    value={this.state.publicInfo.username}
                    readOnly
                />

                {/*Usertype field*/}
                <label htmlFor="type-fld">User type</label>
                <input
                    className="form-control"
                    id="type-fld"
                    value={this.state.publicInfo.type}
                    readOnly
                />

                {/*Email*/}
                <label htmlFor="email-fld">Email</label>
                <input
                    className="form-control"
                    id="email-fld"
                    value={this.state.publicInfo.email}
                    readOnly
                />

                {/*Location*/}
                <label htmlFor="location-fld">Location</label>
                <input
                    className="form-control"
                    id="location-fld"
                    value={this.state.publicInfo.location}
                    readOnly
                />

                <div className="py-3">
                    <button className="btn btn-danger btn-block" onClick={this.props.history.goBack}>Back</button>
                </div>

            </div>
        )
    }

}


export default PublicProfilePage