const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route to generate random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

server.post('/ITC505/lab-7', (req, res) => {
    const { noun, adjective, verb, pluralNoun, place } = req.body;
  
    if (!noun || !adjective || !verb || !pluralNoun || !place) {
      res.send(`
        <h1>Submission Failed</h1>
        <p>Please fill out all fields.</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
      `);
      return;
    }
  
    const madLib = `Once upon a time, a ${adjective} ${noun} decided to ${verb} ${adverb} through a field of ${pluralNoun} in search of adventure.
      Along the way, the ${noun} met a wise old turtle who said, 'To succeed, you must always ${verb} ${adverb} and believe in yourself!'
      Inspired by the turtle’s words, the ${adjective} ${noun} continued with renewed determination.`;
    res.send(`
      <h1>Your Mad Lib Story</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Create Another Mad Lib</a>
    `);
  });
  
// Define the port
let port = 8080;
server.listen(port, () => console.log(`Ready on port ${port}`));
