const mongoose = require('mongoose')
const Tournament = require('../models/tournament')(mongoose)
const { ok, created } = require('../utils/action-results')


function tournamentDto(tournament) {
    return {
      id: tournament._id,
      maxParticipants: tournament.maxParticipants,
      date: tournament.date,
      name: tournament.name,
      activityId: tournament.activity,
      type: tournament.type,
      location: tournament.location,
      description: tournament.description,
      mode: tournament.mode,
      maxAge: tournament.maxAge,
      minAge: tournament.minAge,
      gender: tournament.gender,
      visibility: tournament.visibility,
      owners: tournament.owners
    }
  }


exports.createTournament = async function(req) {
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
    return created(tournamentDto(tournament))
}

//TODO review this method
exports.getAllTournaments = async function(req) {
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
    return ok(tournaments.map( a => tournamentDto(a)))
}

exports.updateTournament = async function(req) {
    let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, {
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
      }, { new: true })
    return ok(tournamentDto(updatedTournament))
}

exports.removeTournament = async function(req) {
    let deletedTournament = await Tournament.findeByIdAndRemove(req.params.id)
    return ok(tournamentDto(deletedTournament))
}


