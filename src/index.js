const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');


const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


const routes = require('./routes');

requireDir('./models');

app.use('/api', routes);


app.listen(3000);	