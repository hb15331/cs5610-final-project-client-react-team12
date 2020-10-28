# cs5610-f20-final-project-team 12

Project Proposal Link : https://docs.google.com/document/d/1FY6LwnaCY1WbJ_9JLPeijY8mEO_XfNO7SOeQDqC5qe0/edit?usp=sharing

__________________________________________________________________________

##PROTOTYPE WIKI

Wiki that describes the API, the search criteria, summary results, and details results. In the wiki page, provide example queries and what results to expect. 

###THE API: Edamam

The Edamam B2B API is accessed by sending HTTPS requests on specific URLs as described below. The base URL is https://api.edamam.com and you obtain the full URL by appending request’s path to the base URL, like https://api.edamam.com/search

On success, the API returns HTTP code 200 OK and the body contains the result of the query in JSON format. In case of errors, the API returns an error code (e.g. 404 NOT FOUND). The body may contain useful information in HTML format. Client programs should use only the response codes, as the bodies are provided for the convenience of the client developers.

###Search Criteria

Search for recipes matching the specified query. Make sure your queries are in the correct language at each specific access point!

The following parameters are part of the GET request URL on a list toward the bottom of the page: https://developer.edamam.com/edamam-docs-recipe-api

###Summary Results


###Details Results