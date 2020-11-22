import React from "react";
import {connect} from "react-redux";
import userService from "../services/UserService"

import RegisterPage from "../components/RegisterPage";


import {Link} from "react-router-dom";

class registerContainer extends React.Component {


    componentDidMount() {
        const userId = this.props.match.params.userId

        // this.props.findCourseById(courseId)
        // this.props.findModulesForCourse(courseId)
        // if(moduleId) {
        //     this.props.findLessonsForModule(moduleId)
        // }
        // if(lessonId) {
        //     this.props.findTopicsForLesson(lessonId)
        // }
        // if(topicId) {
        //     this.props.findWidgetsForTopic(topicId)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const userId = this.props.match.params.userId
        // const moduleId = this.props.match.params.moduleId
        // const lessonId = this.props.match.params.lessonId
        // const topicId = this.props.match.params.topicId
        // if(courseId !== prevProps.match.params.moduleId) {
        //     this.props.findLessonsForModule(moduleId)
        // }
        // if(moduleId !== prevProps.match.params.moduleId) {
        //     this.props.findLessonsForModule(moduleId)
        // }
        // if(lessonId !== prevProps.match.params.lessonId) {
        //     this.props.findTopicsForLesson(lessonId)
        // }
        // if(topicId !== prevProps.match.params.topicId) {
        //     this.props.findWidgetsForTopic(topicId)
        // }
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
