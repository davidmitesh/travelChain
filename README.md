# travelChain
<div>
<u>Routes for API</u>
API home location: https://travelchain.herokuapp.com/

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
name-> String<br>
description->String<br>
long-> Number<br>
lat-> Number<br>
prize-> Number<br>

<h2>Route 3 : To create all the challenges with only id,name and location</h2>
/getChallenges     -> Get request
<br>
<h3>Returns:</h3>
{
cid(challengeId),
name,
loc
}
<br>

</div>

