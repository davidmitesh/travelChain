const express=require('express');
let port = process.env.PORT;
const app=express();
var mongoose= require('./server/db/mongoose.js');
var {User}= require('./server/models/user.js');
app.get('/',(req,res)=>{
    res.send('Hey welcome to the platform');
});


app.get('/addUser',(req,res)=>{


const kitty = new User({ name: 'Zildjian' });
kitty.save().then(() => res.send("successfully added"));
});
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log('Server is high on port 3000');
});
