//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//Q2 delete actors and all their movies
app.delete('/actors/allMovies/:id', actors.deleteActorMovies);
//Q3 remove a movie from the list of movies of an actor
app.post('/actors/removeMovieFromList/:actorID/:movieID', actors.removeMovie);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//Q1 Delete movie by ID 
app.delete('/movies/:id',movies.deleteOne);
//Q4 remove an actor from a list of actors in a movie
app.post('/movies/:movieID/actorID', movies.removeActor);
//Q5 add an existing actor to a list of actors in a movie
app.post('/movies/removeActorFromMovie/:movieID/actor', movies.addActor);