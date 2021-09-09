var express = require('express');
var app = express();
var cookieparser = require('cookie-parser');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

var prodRoute = require('./Routes/prod');
var adminRoute = require('./Routes/admin');


app.use('/',prodRoute);
app.use('/products',adminRoute);


app.listen(3000,function(req,res) {
    console.log("server running on http://localhost:3000");
});