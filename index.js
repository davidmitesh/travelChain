const express=require('express');
let port = process.env.PORT;
var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
const _=require('lodash');
var bodyParser= require('body-parser');
let app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.get('/',(req,res)=>{
    res.send('Hey welcome to the platform');
});


app.post('/addUser',(req,res)=>{
    User.countDocuments({},(err,count)=>{
        var newComer = new User({ name: req.body.name,uid:count+1,tokens:10,gender:req.body.gender,verifier:req.body.verifier });
        newComer.save().then(() => res.send("successfully added"));
    })

});
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log('Server is high on port 3000');
});
