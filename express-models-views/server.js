const express = require('express');
const app     = express();
const PartyPotensh = require('./models/partyPotensh');

app.get('/partyPotensh', (req, res) => {
  res.send(PartyPotensh)
});

// app.get('/partyPotensh/:index', (req, res) => {
//   console.log(req.params, '<-- this is req.params');
//     res.send(PartyPotensh[req.params.index]);
// });

app.get('/partyPotensh/:index', (req, res) => {
 res.render('show.ejs', {
   partyPotensh: PartyPotensh[req.params.index]// This creates a 'fruits' variable in the show page
 })
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
