var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    //Q1 delete movie by ID
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({_id: req.params.id}, function(err){
            if(err)
                return res.status(400).json(err);
                res.json
        })
    },

    //Q4 remove an actor from a list of actors in a movie
    removeMovie: function (req, res) {
        let actorID = req.params.actorID;
        let movieID = req.params.movieID;

        Movie.findOne({ _id: movieID }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: actorID }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.pull(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        })
    },

    //Q5 add an existing actor to the list of actors in a movie
    addActor: function (req, res) {
        let actorID = req.params.actorID;
        let movieID = req.params.movieID;

        Movie.findOne({ _id: movieID }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: actorID }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    }

};