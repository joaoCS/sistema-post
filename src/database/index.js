const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deploy:uploaddeploy@cluster0-zpfz0.mongodb.net/test?retryWrites=true&w=majority', {

 useNewUrlParser: true,
 useFindAndModify: false,
 useCreateIndex: true });


mongoose.Promise = global.Promise;

 module.exports = mongoose;
