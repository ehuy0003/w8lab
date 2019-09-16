const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },


    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },

    //Q2 Delete an actor and all their movies
    deleteActorMovies: function (req, res) {
    // First find the Actor that user wants to delete
        Actor.findById({ _id: req.params.id }, function (err, actor){
            if (err)
                res.json(err);
            // Delete all the actors movies
                Movie.deleteMany({ _id: actor.movies }, function(err, movie){
                    if (err) 
                        res.json(err);
                    // Deleting Actor
                    else 
                        Actor.findOneAndRemove({ _id: req.params.id}, function (err, actor){
                            if (err)
                                res.json(err);
                            else
                                res.return("Actor and their movies deleted!!!!")
                    })
            })
        }) 
    },

    //Q3 Remove a movie from the list of movies of an actor
    removeMovie: function (req, res) {
        // declare
        let actorID = req.params.actorID;
        let movieID = req.params.movieID;
        // Find actor ID
        Actor.findOne({ _id:actorID }).exec(function (err, actor) {
            if (err){
                res.status(400).json(err);
                res.status(404).json(err);
            } else (
                // Then find movie ID
                Movie.findOne({ _id:movieID }).exec(function (err, book){
                    if (err) {
                        res.status(400).json(err);
                        res.status(404).json(err);
                    } else {
                        actor.movie.pull(movie._id);
                        actor.save(function(err){
                            if (err) res.json(err);
                            else res.json("Movies Removed!!!");
                        })
                    }
                })
            )
        })
    },

    //Q7 Update the implementation such that the array of movies should contain the details of the movies instead of IDs
    getAllNew: function(req, res) {
        Actor.find().populate('movies').exec(function(req, actors){
            if (err) return res.status(404).json(err);
            else return res.json(actors);
        })
    }
     
};