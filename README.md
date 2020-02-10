# travelChain

<p>travelChain is the cross-platform mobile application built using google's flutter on top of IPFS and Ethereum blockchain. This project is built for Spirathon 2020 organized by Spiralogics. This GitHub repo contains code of  the backend server for the application.
</p>

<h3>Technology stack for backend</h3>

<h4><b> Nodejs</b></h4>
<img src="https://miro.medium.com/max/1200/1*m5RYM_Wkj4LsZewpigV5tg.jpeg" height="200" width="400">
<h4><b> Solidity</b></h4>
<img src="https://cointral.com/wp-content/uploads/2019/11/solidity-nedir.png" height="200" width="400">
<h4><b>Ethereum ropsten Network</b></h4>
<img src="https://s.yimg.com/ny/api/res/1.2/79GZvpsBiB0w.4UMxQEijw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en-US/homerun/coin_rivet_596/45607ac1ecdfb82f720db97b79887702" height="200" width="400">
<h4><b> MongoDB</b></h4>
<img src="https://i.pcmag.com/imagery/reviews/02Q6yxveinggAu3PomearaV-7.fit_scale.size_2698x1517.jpg" height="200" width="400">
<h4><b> IPFS</b></h4>
<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" height="200" width="400">
<h4><b> TruffleJS</b></h4>
<img src="https://truffleframework.com/img/favicons/truffle-share.png" height="200" width="400">
<h4><b> Python(sklearn,scipy,numpy)</b></h4>
<img src="https://www.vizteams.com/wp-content/uploads/2013/08/python-logo-master.png" height="200" width="400">

<h1>API Documentation</h1>

<h3>The Routes are pulblished as Postman Documentation.</h3>
 Link to the Documentation: https://documenter.getpostman.com/view/4310517/SWTK3ZFU?version=latest
 
<div>
<u>Routes for API</u><br>
 home location: https://travelchain.herokuapp.com/

<h2>Route 1 : To signup a new user</h2>
/addUser     -> Post request
<br>
<h3>parameters:</h3>
<br>
name-> String<br>
gender->String<br>
long-> Number<br>
lat-> Number<br>
verifier-> Boolean<br>
<b>Note: Verifier indicates whether the user is a verifier or not!</b>

<h2>Route 2 : To create a new challenge</h2>
/createChallenge     -> Post request
<br>
<h3>parameters:</h3>
<br>
creatoruid -> Number<br>
name-> String<br>
description->String<br>
long-> Number<br>
lat-> Number<br>
prize-> Number<br>

<h2>Route 3 : To get all the challenges with only id,name and location</h2>
/getChallenges     -> Get request
<br>
<h3>Returns:</h3>
{
cid(challengeId),
name,
loc
}
<br>

<h2>Route 4 : To get a particular challenge with full description</h2>
/challenge     -> Query Get request
<br>
<h3>parameters:</h3>
<br>
cid<br>
https://travelchain.herokuapp.com/challenge?cid=<value><br>
  
<h2>Route 5 : To Join a  challenge based on challenge ID</h2>
/joinchallenge     -> Query Get request
<br>
<h3>parameters:</h3>
<br>
cid-> Int(Challenge ID)<br>
uid->Int(User ID)<br>
https://travelchain.herokuapp.com/joinChallenge?uid=<value>&cid=<value><br>

<h2>Route 6 : To get a user detail based on User ID</h2>
/getUser     -> Query Get request
<br>
<h3>parameters:</h3>
<br>
uid<br>
https://travelchain.herokuapp.com/getUser?uid=<value><br>
 
<h2>Route 7 : To upload a challenge video </h2>
/vidUpload     -> Query post request
<br>
<h3>parameters:</h3>
<br>
uid<br>
cid<br>
&lt;form method="post" action="https://travelchain.herokuapp.com/vidUpload?uid=1&cid=1" enctype="multipart/form-data"&gt;
        &lt;input type="file" name="videoFile"&gt;<br>
        &lt;input type="submit" value="Submit"&gt;
<br>
https://travelchain.herokuapp.com/vidUpload?uid=&lt;value&gt;&cid=&lt;value&gt;<br>
 <b>Note: enctype should be strictly multipart/form-data</b>
 
<h2>Route 8 : To confirm a challenge video by the verifier </h2>
/verifyVideo     -> Query Get request
<br>
<h3>parameters:</h3>
<br>
vid<br>
cid<br>
uid(This is the user id of user who submitted the video,not user id of verifier)<br> 
https://travelchain.herokuapp.com/verifyVideo?vid=<value>&cid=<value><br>
 
 
<h2>Route 9 : Getting assigned videos for a verifier </h2>
/giveVideoUrls     -> Query Get request
<br>
<h3>parameters:</h3>
<br>
uid<br>
https://travelchain.herokuapp.com/giveVideoUrls?uid=<value><br>
 
<h2>Route 10 :Getting joined challenges of a particullar user </h2>
/getJoinedChallenges   -> Query Get request
<br>
<h3>parameters:</h3>
<br>
uid<br>
https://travelchain.herokuapp.com/getMyChallenges?uid=<value><br> </h2>

<h2>Route 11 :Getting completed challenges of a particullar user </h2>
/getCompletedChallenges   -> Query Get request
<br>
<h3>parameters:</h3>
<br>
uid<br>
https://travelchain.herokuapp.com/getCompletedChallenges?uid=<value><br> </h2>



</div>

