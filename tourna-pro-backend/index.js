const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./src/routes')(app);

app.use(function(req, res) {
  res.status(404).send({url: `${req.originalUrl} not found`})
});

app.listen(port, function () {
  console.log(`TournaPro API server started on port ${port}!`);
});
