import React from "react";
import {connect} from "react-redux";
import orderService from "../services/OrderService"
import OrderList from "../components/OrderList";
import {findAllOrders} from "../services/OrderService"
import {findOrderForUser} from "../services/OrderService"
import UserActions from "../actions/UserActions";
import edmamApiService from "../services/edmamApiService";
import OrderActions from "../actions/OrderActions";


class orderListContainer extends React.Component {
    state={
        orders: [],
        label: '',
        userId: '',
        allOrders: [],
        currentUser: {}
    }

    componentDidMount() {
        {this.props.profile()}
        {
            this.props.findAllOrders()
        }
        //TODO: findOrdersByCustomerId
        if(this.props.currentUser){
            const customerId = this.props.currentUser.userId
            if(customerId) {
                this.setState({
                    userId: customerId,
                    orders: this.props.orders,
                    allOrders: this.props.allOrders,
                    currentUser: this.props.currentUser
                })
            }
            this.props.findOrderForUser(customerId)

        }



        const orderId = this.props.match.params.orderId


    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.currentUser && this.props.currentUser){

            if(prevProps.currentUser.userId !== this.props.currentUser.userId){
                {this.props.profile()}
                {this.props.findAllOrders()}
                this.setState({
                    userId: this.props.currentUser.userId,
                    orders: this.props.orders,
                    allOrders: this.props.allOrders,
                    currentUser: this.props.currentUser
                })
                if(this.props.currentUser.userId) {
                    {this.props.findOrderForUser(this.props.currentUser.userId)}
                    {this.props.findAllOrders()}
                    {console.log("I am here234", this.state.allOrders)}
                }

                // if(this.props.currentUser.type === "DELIVERER"){
                //     this.props.findAllOrders()
                    // .then(allOrders => this.setState({
                    //     allOrders: allOrders
                    // }))

                // }

            }
            // if(prevProps.allOrders !== this.props.allOrders) {
            //     {
            //         this.props.findAllOrders()
            //     }
            // }
        }

    }
    render() {

        console.log("Props in OrderListContainer", this.props)
        console.log("State in orderListContainer", this.state)
        {console.log("I am here", this.state.allOrders)}
        {console.log("userId", this.props.currentUser.userId)}

        return(

            <div class="container-fluid">
                {console.log("I am hereOrders", this.state.allOrders)}
                <OrderList orders={this.state.orders}
                           customerId={this.state.userId}
                           allOrders={this.state.allOrders}
                           currentUser={this.state.currentUser}/>
            </div>

        )

    }

}

const stateToPropertyMapper = (state) => ({
    // course: state.courseReducer.course
    order: state.orderReducer.order,
    orders: state.orderReducer.orders,     // new addition
    allOrders: state.orderReducer.allOrders,
    currentUser: state.UserReducer.currentUser
})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),

    // findAllOrders: () => OrderActions.findAllOrders(dispatch),
    // findAllOrders: () =>findAllOrders()
    //         .then(orders => dispatch({
    //             // type: "FIND_ALL_WIDGETS",
    //             type: "FIND_ALL_ORDERS",
    //             orders
    //         })),

    findAllOrders: () => orderService.findAllOrders()
        .then(allOrders => dispatch({
            type: "FIND_ALL_ORDERS",
            allOrders
        })),


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
//  import React from "react";
//  import {connect} from "react-redux";
//  import orderService from "../services/OrderService"
//  import OrderList from "../components/OrderList";
//  import {findAllOrders} from "../services/OrderService"
//  import {findOrderForUser} from "../services/OrderService"
//  import UserActions from "../actions/UserActions";
//  import edmamApiService from "../services/edmamApiService";
//  import OrderActions from "../actions/OrderActions";
//
//
//  class orderListContainer extends React.Component {
//         state={
//             orders: [],
//             label: '',
//             userId: ''
//         }
//
//      componentDidMount() {
//             //TODO: findOrdersByCustomerId
//          if(this.props.currentUser){
//              const customerId = this.props.currentUser.userId
//              if(customerId) {
//                  this.setState({
//                      userId: customerId,
//                      orders: this.props.orders
//                  })
//              }
//              this.props.findOrderForUser(customerId)
//          }
//          {
//              this.props.findAllOrders()
//          }
//
//
//          const orderId = this.props.match.params.orderId
//
//
//          // if(customerId){
//          //     this.props.findOrderForUser(customerId)
//          // }
//          // if(12){
//          //     this.props.findOrderForUser(customerId)
//          // }
//          // this.props.findAllOrders()
//
//          // this.setState({orders: this.props.location.state.orders})
//          // this.setState({label:this.props.location.state.label})
//          // console.log("hello:"+this.props.location.state.orders)
//      }
//      componentDidUpdate(prevProps, prevState, snapshot) {
//
//          if(prevProps.currentUser.userId !== this.props.currentUser.userId){
//              {this.props.profile()}
//              {this.props.findAllOrders()}
//              this.setState({
//                  userId: this.props.currentUser.userId,
//                  orders: this.props.orders
//              })
//              if(this.props.currentUser.userId) {
//                  this.props.findOrderForUser(this.props.currentUser.userId)
//              }
//          }
//
//          // const customerId = this.props.currentUser.userId
//          //    const orderId = this.props.match.params.orderId
//          // // if(customerId !== prevProps.currentUser) {
//          // //     this.props.findOrderForUser(customerId)
//          // // }
//          //     this.props.findOrderForUser(customerId)
//      }
//      render() {
//
//          console.log("Props in OrderListContainer", this.props)
//          console.log("State in orderListContainer", this.state)
//
//          return(
//
//              <div class="container-fluid">
//                  <OrderList orders={this.state.orders}
//                             customerId={this.state.userId}
//                             allOrders={this.props.allOrders}
//                             currentUser={this.props.currentUser}/>
//              </div>
//
//          )
//
//      }
//
// }
//
//  const stateToPropertyMapper = (state) => ({
//      // course: state.courseReducer.course
//      order: state.orderReducer.order,
//      orders: state.orderReducer.orders,     // new addition
//      allOrders: state.orderReducer.allOrders,
//      currentUser: state.UserReducer.currentUser
//  })
//
//  const propertyToDispatchMapper = (dispatch) => ({
//      profile: () => UserActions.profile(dispatch),
//      findAllOrders: () => OrderActions.findAllOrders(dispatch),
//      // findAllOrders: () =>findAllOrders()
//      //         .then(orders => dispatch({
//      //             // type: "FIND_ALL_WIDGETS",
//      //             type: "FIND_ALL_ORDERS",
//      //             orders
//      //         })),
//      findOrderForUser: (customerId) => findOrderForUser(customerId)
//              .then(orders => dispatch({
//                  type: "FIND_ORDERS_FOR_USER",
//                  orders,
//                  customerId
//              }))
//  })
//
//  export default connect
// (stateToPropertyMapper, propertyToDispatchMapper)
//  (orderListContainer)
