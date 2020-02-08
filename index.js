const express=require('express');
let port = process.env.PORT;
const _=require('lodash');
var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
var {Challenge}= require('./server/models/challenge.js');
var bodyParser= require('body-parser');
let cors=require('cors');
let app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//------------------------------------IPFS libraries section------------------------------------
const ipfsAPI = require('ipfs-api');
const ipfs = new ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const fs= require('fs');

//--------------------------------------------------------------------------------------
//!!!!!-------------------------Home route----------------------------------------------
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
            creatoruid:req.body.creatoruid,
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

});
// ----------------------------------------------------------------------------------------
// !!!!!!----------Getting all the challenges with challenge id,name and location-------
app.get('/getChallenges',(req,res)=>{
    Challenge.find({},function(err,docs){
        let filter=[];
        _.map(docs,(doc)=>{
            filter.push({"cid":doc.cid,"name":doc.name,"loc":doc.loc})
        })
        res.send(filter);
    })
});

// ----------------------------------------------------------------------------------------
// !!!!!!------------------Getting a particular  challenge with full description-------
//Requires query string.for eg-  /challenge?cid=1
app.get('/challenge',(req,res)=>{
    Challenge.findOne({cid:req.query.cid},function(err,doc){
        res.send(doc);
    })
});


//-----------------------------------------------------------------------------------------
//!!!!!!---------------------Joining a challenge-------------------------------------------
app.post('/joinChallenge',(req,res)=>{
    Challenge.findOneAndUpdate({cid:req.body.cid},{$push:{joinedUsers:{uid:req.body.uid}}},(err,challenge)=>{
        User.findOneAndUpdate({uid:req.body.uid},{$push:{joinedChallenges:{name:challenge.name,cnumber:challenge.cid}}},(err,user)=>{
            if (err){
                res.send('Either challenge not found or user not found')
            }
            mergedData={challenge,user}
            res.send(mergedData);
        })
    })
})

//----------------------------------------------------------------------------------
//!!!!!!!!-------------------Getting a user description based on Userid(uid)-----------
app.get('/getUser',(req,res)=>{
    User.findOne({uid:req.query.uid},(err,result)=>{
        res.send(result);
    })
})

//----------------------------------------------------------------------------------
//!!!!!!!!-------------------Confirming a video verification by verifier-----------



//--------------------------Server configuration codes-------------------------------------
if (port == null || port == "") {
  port = 5000;
}
app.listen(port,()=>{
    console.log('Server is high on port 5000');
});
