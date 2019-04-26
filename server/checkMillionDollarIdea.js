const checkMillionDollarIdea = (req,res,next) => {
  const idea = req.body;
  idea.numWeeks = idea.numWeeks || 'error';
  idea.weeklyRevenue = idea.weeklyRevenue || 'error';
  if ((typeof idea.numWeeks === 'string') || (typeof idea.weeklyRevenue === 'string')) {
    res.status(400).send();
  } else{
    if(idea.numWeeks*idea.weeklyRevenue < 1000000) {
      res.status(400).send();
    } else {
      next();
    }
  }
};



// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
