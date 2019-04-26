const express = require('express');
const ideaRouter = express.Router();
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const modelType = 'ideas';

ideaRouter.get('/',(req,res,next)=>{
  res.status(200).send(db.getAllFromDatabase(modelType));
});

ideaRouter.post('/',checkMillionDollarIdea,(req,res,next)=>{
  const result = db.addToDatabase(modelType, req.body);
  if(result) {
    res.status(201).send(result);
  } else {
    res.sendStatus(500);
  }
});

ideaRouter.get('/:ideaId', (req,res,next)=>{
  const idea = db.getFromDatabaseById(modelType, req.params.ideaId);
  if(idea) {
    res.status(200).send(idea);
  } else {
    // not found
    res.sendStatus(404);
  }
});

ideaRouter.put('/:ideaId', (req,res,next)=>{
  const idea = db.updateInstanceInDatabase(modelType, req.body);
  if(idea) {
    res.status(200).send(idea);
  } else {
    // not found
    res.sendStatus(404);
  }
});

ideaRouter.delete('/:ideaId', (req,res,next)=>{
  const isDeleted = db.deleteFromDatabasebyId(modelType,req.params.ideaId);
  if(isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = ideaRouter;
