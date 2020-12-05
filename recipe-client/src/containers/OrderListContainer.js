 import React from "react";
 import {connect} from "react-redux";
 import orderService from "../services/OrderService"
 import OrderList from "../components/OrderList";
 import {findAllOrders} from "../services/OrderService"
 import {findOrderForUser} from "../services/OrderService"
 import UserActions from "../actions/UserActions";


 class orderListContainer extends React.Component {
        state={
            orders: [],
            label: ''
        }

     componentDidMount() {
            //TODO: findOrdersByCustomerId
         const customerId = this.props.currentUser.userId
         const orderId = this.props.match.params.orderId
         // if(customerId){
         //     this.props.findOrderForUser(customerId)
         // }
         // if(12){
             this.props.findOrderForUser(customerId)
         // }
         // this.props.findAllOrders()

         // this.setState({orders: this.props.location.state.orders})
         // this.setState({label:this.props.location.state.label})
         // console.log("hello:"+this.props.location.state.orders)
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
         const customerId = this.props.currentUser.userId
            const orderId = this.props.match.params.orderId
         // if(customerId !== prevProps.currentUser) {
         //     this.props.findOrderForUser(customerId)
         // }
             this.props.findOrderForUser(customerId)
     }
     render() {

         return(

             <div class="container-fluid">
                 <OrderList/>
             </div>

         )

     }

}

 const stateToPropertyMapper = (state) => ({
     // course: state.courseReducer.course
     order: state.orderReducer.order,
     currentUser: state.UserReducer.currentUser
 })

 const propertyToDispatchMapper = (dispatch) => ({
     profile: () => UserActions.profile(dispatch),
     // findAllOrders: () =>findAllOrders()
     //         .then(orders => dispatch({
     //             // type: "FIND_ALL_WIDGETS",
     //             type: "FIND_ALL_ORDERS",
     //             orders
     //         })),
     findOrderForUser: (customerId) => findOrderForUser(customerId)
             .then(orders => dispatch({
                 type: "FIND_ORDERS_FOR_USER",
                 orders,
                 customerId
             }))
 })

 export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
 (orderListContainer)
