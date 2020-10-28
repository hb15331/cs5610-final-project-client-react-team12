import React from 'react'
import ReactDOM from 'react-dom'
import SearchRecipe from "./SearchRecipe";

export default class EdamamClient extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1> Recipe Edamam Client </h1>
                <SearchRecipe/>
            </div>
        )
    }
}

ReactDOM.render(
    <EdamamClient/>
    document.getElementById('root')
);