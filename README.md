# Assignment 2 - Web API.
Name: Yikun Fan 20099869

## Features.
 + Reviews that user commented can be saved and fetched now.
 + User can view the movie they may be interested, those movies are shown based on the genres of user's favorite movies.
 + Perviously, app can directly fetch data from tmdb api at the front end, now they are all updated.
 + User can login, sign up.
 + After login, each user can have their own favorite movie list, independent of everyone else's.

## Setup requirements.
 + cd MyTMDB and install packages: npm install
 + cd movies-api and install packages: npm install
 + start movies-api and Open browser at: http://localhost:3000

## API Configuration
Please create a `.env` file in the movies-api, and here is the content:  
______________________
PORT=8080  
HOST=localhost  
MONGO_DB=YourMongoURL  
SEED_DB=True  
SECRET=YourJWTSecret  
REACT_APP_TMDB_KEY=YourTmdbKey  
______________________

## API Design
[Swaggerhub](https://app.swaggerhub.com/apis/LuMingJun62511/TMDBtest1/1.0.0#/Device).

## Security and Authentication
The api about movies and genres are protected, and those are implemented using JWT strategy.
The following routes are protected 
+ /reviews/form
+ /reviews/:id
+ /movies/favorites
+ /movies/:id
+ /movies/upcoming
+ /movies/interesting


## Integrating with React App
+ /reviews/form  
In this view, user can post their reviews to the database, the review must not contain some bad words
+ /reviews/:id  
In this view, user can get reviews not only from tmdb api, but also from database, those reviews are user commented
+ /movies/favorites  
In this view, user can get their favorites movies from database, those favorites movies are chosen by users at the main page, and posted to database
+ /movies/interesting  
In this view, user can view the movie they may be interested, those movies are shown based on the genres of user's favorite movies.

## Independent learning (if relevant)
I learned the basic operation of the mongoDB, like create a object and insert it into a schema, by using this, I can store the reviews user commented 