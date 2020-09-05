const bodyParser = require('body-parser');
const express=require("express");
const mongoose = require('mongoose');
const routes = require('./router/index');
const server = express();

const DB_URL = 'mongodb://localhost:27017/iCrowdTaskDB';
mongoose.connect(DB_URL,{ useNewUrlParser: true });


server.use(express.static("public"))
server.use(express.static("router"))
server.use(express.static("views"))
server.set('view engine', 'html');
server.set('view engine', 'css');



server.use(bodyParser());
routes(server);
server.listen(3000);
 