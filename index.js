const express=require('express');
let port = process.env.PORT;
const app=express();
var mongoose= require('./server/db/mongoose.js');
app.get('/',(req,res)=>{
    res.send('Hey welcome to the platform');
});
var userSchema = new mongoose.Schema({
    name:String
});
const Cat = mongoose.model('Cat', userSchema);
app.get('/addUser',(req,res)=>{


const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => res.send("successfully added"));
});
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log('Server is high on port 3000');
});
