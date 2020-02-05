const express=require('express');
let port = process.env.PORT;
<<<<<<< HEAD

var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
var {Challenge}= require('./server/models/challenge.js');
var bodyParser= require('body-parser');
let cors=require('cors');
//important parameters in order for code to run
=======
var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
const _=require('lodash');
var bodyParser= require('body-parser');
>>>>>>> f0a6cf6dc7fc61063383ace56abf1a6e916963ef
let app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.get('/',(req,res)=>{
    res.send('Hey welcome to the platform');
});

//----------------------------------------------------------------------------------------------
//!!!!!!!!-----Signing up a new user--------
app.post('/addUser',(req,res)=>{
const newUser = new User({ name: req.body.name,gender:req.body.gender, verifier:req.body.verifier});
newuser.save().then(() => res.send(newUser));
});

<<<<<<< HEAD
//-------------------------------------------------------------------------------------------
//!!!!!!-----------Creating a new challenge--------------------------------------------
app.post('/createChallenge',(req,res)=>{
    const newChallenge=new Challenge({
        name:req.body.name,
        description:req.body.description,
        "loc": {
            "type": "Point",
            "coordinates": [req.body.long, req.body.lat]
        },
        tokenprice:req.body.prize
    });
    newChallenge.save().then(()=>res.send(newChallenge));
})

//--------------------------Server configuration codes-------------------------------------
=======
app.post('/addUser',(req,res)=>{
    User.countDocuments({},(err,count)=>{
        var newComer = new User({ name: req.body.name,uid:count+1,tokens:10,gender:req.body.gender,verifier:req.body.verifier });
        newComer.save().then(() => res.send("successfully added"));
    })

});
>>>>>>> f0a6cf6dc7fc61063383ace56abf1a6e916963ef
if (port == null || port == "") {
  port = 5000;
}
app.listen(port,()=>{
    console.log('Server is high on port 5000');
});
