import React from 'react'

class SearchRecipe
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {keyword: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit
    }
    handleChange(event) {
        this.setState(
            {keyword: event.target.value}
        );
    }
    handleSubmit(event) {
        alert(this.state.keyword);
        event.preventDefault();
        let url = 'http://api.edamam.com/search';
            url += '?q=' + this.state.keyword;
            url += 'app_id=${e488ff8f}&app_key=${922801bd953e0343123e19348ba693fe}';
            fetch(url)
                .then(res => res.json())
                .then(json =>  {this.setState({recipes: json.Search});
                })
    }
    renderRecipes() {
        var items;
        if(this.state.recipes) {
            items = this.state.recipes
                .map(function(item, index) {
                    return <li className="list-group-item"
                               key={index}>{item.label}</li>;
                });}
        return (
            <ul className="list-group">
                {items}</ul>
        )}

    render() {
        return (
            <div>
                <h2>Search Recipes</h2>
                <div className="input-group">
                    <input className="form-control"
                           placeholder="keyword"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">Search</button>
                </form>
                <h2>Results</h2>
                {this.renderRecipes()}

            </div>

        )
    }
}
export default SearchRecipe;