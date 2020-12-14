
# cs5610-f20-final-project-team 12

Project Proposal Link : https://docs.google.com/document/d/1FY6LwnaCY1WbJ_9JLPeijY8mEO_XfNO7SOeQDqC5qe0/edit?usp=sharing

# Instructions: 
To run the program, navigate to recipe-client directory. 
Do npm install ,npm install bootstrap, and npm install jquery.
To start the program, run npm start.

# Heroku Link:
https://salty-shelf-18174.herokuapp.com/
__________________________________________________________________________

### PROTOTYPE WIKI 
*(UML in the Proposal Doc linked above)*
Wiki that describes the API, the search criteria, summary results, and details results. In the wiki page, provide example queries and what results to expect. 

### THE API: Edamam

The Edamam B2B API is accessed by sending HTTPS requests on specific URLs as described below. The base URL is https://api.edamam.com and you obtain the full URL by appending request’s path to the base URL, like https://api.edamam.com/search

On success, the API returns HTTP code 200 OK and the body contains the result of the query in JSON format. In case of errors, the API returns an error code (e.g. 404 NOT FOUND). The body may contain useful information in HTML format. Client programs should use only the response codes, as the bodies are provided for the convenience of the client developers.

### Search Criteria

Search for recipes matching the specified query. Make sure your queries are in the correct language at each specific access point!

The following parameters are part of the GET request URL on a list toward the bottom of the page: https://developer.edamam.com/edamam-docs-recipe-api

### Summary Results

The search result provides a list of dish names that matched the specified query. For example, users can search for the keyword chicken.
The search would then provide a list of dishes that has chicken as an ingredient. The search result would allow the users to choose from
multiple dishes provided.

### Details Results

Clicking on a certain dish name navigates the user a new page that includes more details about the dish. 
This includes an image of the name, number of servings, number of calories, total weight of the dish, and an ingredients list.
This information is obtained from the specified query.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

