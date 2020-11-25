 import React from "react";
 import {connect} from "react-redux";
 import orderService from "../services/OrderService"
 import OrderList from "../components/OrderList";


 class orderListContainer extends React.Component {
        state={
            orders: [],
            label: ''
        }

     componentDidMount() {
         const orderId = this.props.match.params.orderId
         this.setState({orders: this.props.location.state.orders})
         this.setState({label:this.props.location.state.label})
         console.log("hello:"+this.props.location.state.orders)
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
         const orderId = this.props.match.params.orderId
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
     order: state.orderReducer.order
 })

 const propertyToDispatchMapper = (dispatch) => ({

     findAllOrder: () =>
         orderService.findAllOrder()
             .then(orders => dispatch({
                 // type: "FIND_ALL_WIDGETS",
                 type: "FIND_ALL_ORDERS",
                 orders
             }))
 })

 export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
 (orderListContainer)
