require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const requireDir = require('require-dir');



const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));



const routes = require('./routes');

requireDir('./models');

//app.use(express.json());

app.use('/api', routes);


app.listen(process.env.PORT  || 3001);	
