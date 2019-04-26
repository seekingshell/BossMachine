const express = require('express');
const meetingRouter = express.Router();
const db = require('./db');
const modelType = 'meetings';

meetingRouter.get('/',(req,res,next)=>{
  res.status(200).send(db.getAllFromDatabase(modelType));
});

meetingRouter.post('/',(req,res,next)=>{
  const meeting = db.createMeeting();
  res.status(201).send(db.addToDatabase(modelType, meeting));
});

meetingRouter.delete('/',(req,res,next)=>{
  if(db.deleteAllFromDatabase(modelType)) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = meetingRouter;
