const mongoose = require('mongoose')
const Tournament = require('../models/tournament')(mongoose)
const { ok, created, notImplemented } = require('../utils/action-results')

exports.createTournament = function(req, res) {
    let tournamentModel = new Tournament({
        name: req.body.name,
        description: req.body.description,
        date: new Date(req.body.date),
        activity: req.body.activity,
        type: req.body.type,
        location: req.body.location,
        mode: req.body.mode,
        maxAge: req.body.maxAge,
        minAge: req.body.minAge,
        maxParticipants: req.body.maxParticipants,
        gender: req.body.gender,
        visibility: req.body.visibility,
        status: "PENDING",
        participants: [],
        matches: [],
        owners: req.body.owners //TODO change??
    })
    let tournament = await tournamentModel.save()
    return created(tournament)
}

exports.getAllTournaments = function(req, res) {
    let query = Tournament.find().sort('-date')

    if(req.params.mode){
        query = query.where('mode').equals(req.params.mode)
    }
    if(req.params.from){
        query = query.where('date').gt(req.params.from)
    }
    if(req.params.to){
        query = query.where('date').lt(req.params.to)
    }
    if(req.params.activities){
        query = query.where('activity').in(req.params.activities)
    }
    if(req.params.location){
        query = query.where('location').equals(req.params.location)
    }
    if(req.params.pageNum && req.params.pageSize){
       query = query.skip(req.params.pageNum*req.params.pageSize).limit(req.params.pageSize)
    }
    let tournaments = await query.exec();
    return ok(tournaments)
}

exports.updateTournament = function(req, res) {
    return notImplemented();
}

exports.removeTournament = function(req, res) {
    return notImplemented();
}


