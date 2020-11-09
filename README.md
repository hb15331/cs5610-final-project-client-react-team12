# cs5610-f20-final-project-team 12

Project Proposal Link : https://docs.google.com/document/d/1FY6LwnaCY1WbJ_9JLPeijY8mEO_XfNO7SOeQDqC5qe0/edit?usp=sharing

__________________________________________________________________________

### PROTOTYPE WIKI 

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