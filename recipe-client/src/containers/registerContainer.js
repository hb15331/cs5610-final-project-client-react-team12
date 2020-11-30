/*
import React from "react";
import {connect} from "react-redux";
import userService from "../services/UserService"

import RegisterPage from "../components/RegisterPage";

class registerContainer extends React.Component {


    componentDidMount() {
        const userId = this.props.match.params.userId

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const userId = this.props.match.params.userId
    }
    render() {
        return(
            <div class="container-fluid">
                   <RegisterPage/>
            </div>

        )

    }

}

const stateToPropertyMapper = (state) => ({
    // course: state.courseReducer.course
    user: state.userReducer.user
})

const propertyToDispatchMapper = (dispatch) => ({

    findAllUsers: () =>
        userService.findAllUsers()
            .then(users => dispatch({
                // type: "FIND_ALL_WIDGETS",
                type: "FIND_ALL_USERS",
                users
            }))
})

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(registerContainer)
*/
