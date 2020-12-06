import React from 'react'
import UserService from "../services/UserService";
import {Link} from "react-router-dom";


class PublicProfilePage extends React.Component {

    state = {
        // public info of other user
        publicInfo: {
            userId: '',
            username: '',
            type: ''
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
                    onChange={() => {}}
                />

                {/*Usertype field*/}
                <label htmlFor="type-fld">User type</label>
                <input
                    className="form-control"
                    id="type-fld"
                    value={this.state.publicInfo.type}
                    onChange={() => {}}
                />

                {/*Email*/}
                <label htmlFor="email-fld">Email</label>
                <input
                    className="form-control"
                    id="email-fld"
                    value={this.state.publicInfo.email}
                    onChange={() => {}}
                />

                {/*Location*/}
                <label htmlFor="location-fld">Location</label>
                <input
                    className="form-control"
                    id="location-fld"
                    value={this.state.publicInfo.location}
                    onChange={() => {}}
                />


                <div className="py-3">
                    <Link to="/home" className="btn btn-success btn-block">Home</Link>
                </div>

            </div>
        )
    }

}


export default PublicProfilePage
