import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import SearchRecipe from "./SearchRecipe";
import "../styling/HomePageStyle.css"

// const APP_ID = "e488ff8f"
// const APP_KEY = "922801bd953e0343123e19348ba693fe"
// const RECIPE_URL = "https://api.edamam.com/search"

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        //imageUrl: "https://picsum.photos/200"
        imageUrl: "https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-600w-722718097.jpg"
    }

    render() {
        return (
            <div>


                <nav className="navbar navbar-light">
                    <a className="navbar-brand" href="#">
                        <h1>Foodify</h1>
                    </a>
                </nav>

                <div className="imageStyle">
                    <img className="img-fluid"
                         width="100%"
                         height="auto"
                        src={this.state.imageUrl}
                        alt="randomImage"/>

                </div>

                <SearchRecipe/>

            </div>

        )
    }
}


export default HomePage;