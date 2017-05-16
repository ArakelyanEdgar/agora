var express = require("express");
var app = express();
var path = require("path");

app.set('port', (process.env.PORT || 5000));


app.use(myLogger);
app.use(express.static(path.join(__dirname+"/views")));
app.use(express.static(path.join(__dirname+"/styles")))
app.use(express.static(path.join(__dirname+"/javascript")))

app.route("/")
    .get(function(req,res, next){
        res.sendFile(path.join(__dirname + '/views/main.html'));
    })

app.use(function(err, req,res,next){
    console.error(err.stack)
    res.status(500).send("Something broke :/");
})

app.use(function(req, res, next){
    res.status(404);
    res.sendfile(path.join(__dirname+"/views/status_404.html"))
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});