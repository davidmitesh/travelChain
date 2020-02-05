const express=require('express');
let port = process.env.PORT;

var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
var {Challenge}= require('./server/models/challenge.js');
var bodyParser= require('body-parser');
let cors=require('cors');
//important parameters in order for code to run
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
    User.countDocuments({},function(err,c){
        const newUser = new User({
            name: req.body.name,
            gender:req.body.gender,
             verifier:req.body.verifier,
             uid:c+1,
             "loc": {
                 "type": "Point",
                 "coordinates": [req.body.long, req.body.lat]
             }
         });
        newUser.save().then(() => res.send(newUser));
    })

});

//-------------------------------------------------------------------------------------------
//!!!!!!-----------Creating a new challenge--------------------------------------------
app.post('/createChallenge',(req,res)=>{
    Challenge.countDocuments({},function(err,c){
        const newChallenge=new Challenge({
            name:req.body.name,
            description:req.body.description,
            "loc": {
                "type": "Point",
                "coordinates": [req.body.long, req.body.lat]
            },
            cid:c+1,
            tokenprice:req.body.prize
        });
        newChallenge.save().then(()=>res.send(newChallenge));
    })

})

//--------------------------Server configuration codes-------------------------------------
if (port == null || port == "") {
  port = 5000;
}
app.listen(port,()=>{
    console.log('Server is high on port 5000');
});
