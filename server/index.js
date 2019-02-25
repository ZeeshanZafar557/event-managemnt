//imports all modules
var express=require('express');
var mongoose=require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var passport=require('passport');
//making express method and defining into app
var app=express();

var path =require('path');
//for seperate route file

app.use(cors());

//adding body parser
app.use(bodyparser.json());

 //passport middle ware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(cors());
//adding static files
app.use(express.static(path.join(__dirname, 'public')));
//for binding port
const port=process.env.PORT||4000;
if(process.env.NODE_ENV === 'production')
{
    app.get('/', function (req, res) {
      //  const index = path.join(__dirname, '../', 'build','index.html');
        //res.sendFile(index);
      })
 }

app.listen(port,()=>{
    console.log('Server started at '+ port);

});
const route=require('./routes/route');

app.use('/api',route);

//connect to mongo
mongoose.connect('mongodb://localhost:27017/eventManagment');
mongoose.connection.on('connected',()=>{
    console.log('db connected');
});
mongoose.connection.on('error',(err)=>{
  
    if(err)
    {  
         console.log('db error '+err);
    }
  });