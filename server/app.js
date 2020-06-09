/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');  // We need the mongoose library
const path = require('path');


/**** Configuration ****/
//const appName = "api"; // Change the name of your server app!
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Needed for serving production build of React




/**** Database ****/
const suggestion_db = require('./suggestion_db')(mongoose);



/**** Routes ****/
app.get('/api/suggestions', async (req, res) => {
  const ques = await suggestion_db.getData();
  await res.json(ques);
  console.log(ques);  /// Tried to see if I could find why I dont get the data
});

app.get('/api/suggestions/:id', async (req, res) => {
  let id = req.params.id;
  const ques = await suggestion_db.getSuggestion(id);
   await res.json(ques);
   console.log(ques);
});

app.post('/api/suggestions', async (req, res) => {
  let suggestions = {
      suggestion : req.body.suggestion,
      date: Date().toString(),
      username: req.body.username,
      signatures:0,
      usersignature:[{user:'', userdate:''}]
  };
  const newSuggestion = await suggestion_db.CreateSuggestion(suggestions);
  await res.json(newSuggestion);
});



app.post('/api/suggestions/:id/signatures', async (req, res) => {
  const id = req.params.id;
    const usersignature = {user:req.body.user, userdate:Date().toString()};

  const updatedQuestion = await suggestion_db.addSignatures(id, usersignature);
  await res.json(updatedQuestion);
});

/*app.put('/api/questions/:id/answers/:aid', async (req,res) => {
    const id = req.params.id;
    const aid = req.params.aid;
    const updatedQuestion = await suggestion_db.addVote(id, aid);
    await res.json(updatedQuestion);
});
*/

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);


/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/suggestion_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {

      await suggestion_db.bootstrap(); // Fill in test data if mongoose database is empty.
      await app.listen(port); // Start the API
      console.log(`Suggestion API running on port ${port}!`);

    })
    .catch(error => console.error(error));
