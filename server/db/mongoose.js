var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
var db = process.env.MONGODB_URL;
if (db == null || db == "") {
  db = "mongodb+srv://excelrock_mitesh:krishnatara@travelchain-sz05q.mongodb.net/test?retryWrites=true&w=majority";
}
mongoose.connect(db,{ useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/travelchain',{ useNewUrlParser: true });
module.exports={mongoose};
