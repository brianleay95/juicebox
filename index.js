require('dotenv').config();

// remove this once you confirm it works
//console.log(process.env.JWT_SECRET);
// like, seriously. go delete that!

//console.log('Start')
const PORT = 3000;
const express = require('express');
const server = express();
const morgan = require('morgan');
//console.log('after init')
server.use(morgan('dev'));

server.use(express.json())

const { client } = require('./db');
client.connect();
//console.log('after db')


server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});
//console.log('after server.use')
// stuff above here

const apiRouter = require('./api');
server.use('/api', apiRouter);
//console.log('after router')
// stuff below here

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

// server.get('/background/:color', (req, res, next) => {
//   res.send(`
//     <body style="background: ${ req.params.color };">
//       <h1>Hello World</h1>
//     </body>
//   `);
// });

// server.get('/add/:first/to/:second', (req, res, next) => {
//   res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
//     Number(req.params.first) + Number(req.params.second)
//    }</h1>`);
// });