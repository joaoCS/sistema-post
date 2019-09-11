const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sistemaposts', {

 useNewUrlParser: true,
 useFindAndModify: false,
 useCreateIndex: true });


mongoose.Promise = global.Promise;

 module.exports = mongoose;