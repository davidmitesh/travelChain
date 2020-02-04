var mongoose=require('mongoose');

mongoose.Promise=global.Promise;

// mongoose.connect('mongodb+srv://excelrock_mitesh:krishnatara@travelchain-sz05q.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/travelchain',{ useNewUrlParser: true });
module.exports={mongoose};
