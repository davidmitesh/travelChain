const express=require('express');
let port = process.env.PORT;
const app=express();

app.get('/',(req,res)=>{
    res.send('Hey welcome to the platform');
});
app.get('/addUser',(req,res)=>{
    res.send('user is added');
})
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
    console.log('Server is high on port 3000');
});
