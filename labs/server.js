const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))
// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})
// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Mad Libs POST route
server.post('/itc505/lab-7', (req, res) => {
  const { noun, adjective, verb, adverb, pluralNoun } = req.body;
  // Complete all the fields
  if (!noun || !adjective || !verb || !adverb || !pluralNoun) {
      res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out all fields.</p>
          <a href="/itc505/lab-7/index.html">Go Back to Form</a>
      `);
      return;
  }

  const madLibStory = `
      Once upon a time, a ${adjective} ${noun} decided to ${verb} ${adverb} through a field of ${pluralNoun} in search of adventure.
      Along the way, the ${noun} met a wise old turtle who said, 'To succeed, you must always ${verb} ${adverb} and believe in yourself!'
      Inspired by the turtle’s words, the ${adjective} ${noun} continued with renewed determination.
  `;
  //Passing the first argument response 
  res.send(`
      <h1>Your Mad Lib Adventure</h1>
      <p>${madLibStory}</p>
      <a href="/itc505/lab-7/index.html">Create Another Story</a>
  `);
});

// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}
server.listen(port, () => console.log('Ready on localhost!'))