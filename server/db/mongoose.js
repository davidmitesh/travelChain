var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
const db = process.env.MONGODB_URL;
mongoose.connect(db,{ useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/travelchain',{ useNewUrlParser: true });
module.exports={mongoose};
