const express = require('express');
const minionRouter = express.Router();
const db = require('./db');
const minionModelType = 'minions';
const workModelType = 'work';

minionRouter.param('minionId', (req, res, next, id) => {
  const minion = db.getFromDatabaseById(minionModelType, id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionRouter.get('/',(req,res,next)=>{
  res.status(200).send(db.getAllFromDatabase(minionModelType));
});

minionRouter.post('/', (req,res,next)=>{
  const result = db.addToDatabase(minionModelType, req.body);
  if(result) {
    res.status(201).send(result);
  } else {
    res.sendStatus(500);
  }
});

minionRouter.get('/:minionId', (req,res,next)=>{
  res.status(200).send(req.minion);
});

minionRouter.put('/:minionId', (req,res,next)=>{
  res.status(200).send(db.updateInstanceInDatabase(minionModelType, req.body));
});

minionRouter.delete('/:minionId', (req,res,next)=>{
  const isDeleted = db.deleteFromDatabasebyId(minionModelType,req.params.minionId);
  if(isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(500);
  }
});


/* Work */
minionRouter.get('/:minionId/work', (req,res,next)=>{
  const work = db.getAllFromDatabase(workModelType).filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });
  res.send(work);
});

minionRouter.post('/:minionId/work', (req,res,next)=>{
  let workItem = req.body;
  workItem.minionId = req.params.minionId;
  const result = db.addToDatabase(workModelType, workItem);
  if(result) {
    res.status(201).send(result);
  } else {
    res.sendStatus(500);
  }
});

minionRouter.param('workId', (req, res, next, id) => {
  const work = db.getFromDatabaseById(workModelType, id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionRouter.put('/:minionId/work/:workId', (req,res,next)=>{
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      res.send(db.updateInstanceInDatabase(workModelType, req.body));
    }
});

minionRouter.delete('/:minionId/work/:workId',(req,res,next)=>{
  const deleted = db.deleteFromDatabasebyId(workModelType, req.params.workId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = minionRouter;
