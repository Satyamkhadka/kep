var express= require('express');
const bodyParser = require('body-parser');

var app=express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const routes = require('./Routes')
app.listen(3000,()=>{
    console.log("listeneing at 3000");
});

app.use(routes);
module.exports = app;