const express=require('express');
let port = process.env.PORT;
const _=require('lodash');
var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
var {Challenge}= require('./server/models/challenge.js');
var bodyParser= require('body-parser');
let cors=require('cors');
let app=express();
var multer = require("multer");

//------------------------------------IPFS libraries section------------------------------------
const ipfsAPI = require('ipfs-api');
const ipfs = new ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const fs= require('fs');
const streamURL="https://gateway.ipfs.io/ipfs/";

//-------------------------------------Use of middlewares-----------------------------------------------
//!!!!!!!!!!!!!!!!!!!!!-------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});








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


//!!!!------------------------------------------------------------------------------------
//-------------------This is the setup for video uploading in IPFS------------------------------------
var upload = multer().single('videoFile');
app.post('/vidUpload',function(request,response){
    upload(request,response,function(err){
    if(err){
        console.log("Error")
        return;
    }
    console.log(request)
    Challenge.findOne({cid:request.query.cid},(err,result)=>{
        var index;

        if (result.submittedVideos==null){
            index=1;
        }else{
            var count=result.submittedVideos.length;
            index=count+1;
        }
        ipfs.files.add(response.req.file.buffer, function (err, file) {
            if (err) {
              console.log(err);
            }
            Challenge.findOneAndUpdate({cid:request.query.cid},{$push:{submittedVideos:{vid:index,vhash:file[0].hash,verified:false,uid:request.query.uid,videoURL:streamURL+file[0].hash}}},(err,result)=>{
                User.findOneAndUpdate({verifier:true},{$push:{assignedVideos:{vid:index,vhash:file[0].hash}}},(err,result)=>{
                    console.log(file);
                response.send(result);
                })

            })

    })
})
})
})

//----------------------------------------------------------------------------------
//!!!!!!!!-------------------Confirming a video verification by verifier-----------
app.get('/verifyVideo',(req,res)=>{
    Challenge.findOneAndUpdate({cid:req.query.cid,"submittedVideos.vid":req.query.vid},{$set:{"submittedVideos.$.verified":true}},(err,result)=>{
        res.send(result);
    })
})

//---------------------------Getting assigned videos for a verifier------------------------
//!!!!!!!!!!!!!!!!!---------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/giveVideoUrls',(req,res)=>{
    User.findOne({uid:req.query.uid},(err,result)=>{
        res.send(result.assignedVideos);
    })
})



//--------------------------Server configuration codes-------------------------------------
if (port == null || port == "") {
  port = 5000;
}
app.listen(port,()=>{
    console.log('Server is high on port 5000');
});
