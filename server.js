var express = require('express');
var session = require('express-session');
var bp = require('body-parser');
var path = require('path');
var app = express();
var serverport = 8000;

app.use(session({
    secret: 'timberdog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));


app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(bp.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(serverport, function(){
    console.log(`Listening on port ${serverport}`);
});
