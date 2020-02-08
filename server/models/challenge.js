var mongoose=require('mongoose');

const _=require('lodash');



var challengeSchema = new mongoose.Schema({

    name:{
        type:String
    },
    creatoruid:{
        type:Number
    },
    description:{
        type:String
    },
    cid:{//challenge Number
        type:Number
    },

    loc: {
        type: { type: String },
        coordinates: [Number],
    },


    tokenprice:{
        type:Number,
        required:true

    },
     startdate: {
         type: Date,
          default: Date.now
      },
      enddate: {
          type: Date,
           default: Date.now
       },
    joinedUsers:[{
        uid:{
            type:Number
        }
    }
],
completedUsers:[{
    uid:{
        type:Number
    },
    tokentransfer:{
        type:Boolean
    }
}
],
verifiers:[{
    uid:{
        type:Number
    },
    tokentransfer:{
        type:Boolean
    }
}
],
submittedVideos:[{
    vid:{
        type:Number
    },
    vhash:{
        type:String
    },
    verified:{
        type:Boolean
    },
    uid:{
        type:Number
    },
    videoURL:{
        type:String
    },
    created:{
        type:Date,
        default:Date.now
    }
}
]
});
// defining the location as 2d sphere space to have two points in the coordinates.
challengeSchema.index({ "loc": "2dsphere" });
//sending the JSON specified parameters as required
// userSchema.methods.toJSON=function(){
//     var user=this;
//     var userObject=user.toObject();
//     return _.pick(userObject,['gender']);
// }
//creating a final model out of schema
var Challenge = mongoose.model( "Challenge", challengeSchema );

module.exports={Challenge};
