import React from 'react'
import SearchRecipe from "./SearchRecipe";

export default class EdamamClient extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="container">
                <h1> Recipe Edamam Client </h1>
                <SearchRecipe/>
            </div>
        )
    }
}

