var mongoose=require('mongoose');

const _=require('lodash');



var userSchema = new mongoose.Schema({

    name:{
        type:String,

    },
    uid:{
        type:Number
    },

    loc: {
        type: { type: String },
        coordinates: [Number],
    },


    tokens:{
        type:Number,
        default:0

    },
    gender:{
        type:String
    },


    joinedChallenges:[{
        name:{
            type:String
        },
        cnumber:{
            type:Number
        }
    }
],
completedChallenges:[{
    name:{
        type:String
    },
    cnumber:{
        type:Number
    }
}
],
verifier:{
    type:Boolean
},
assignedVideos:[{
    vid:{
        type:Number
    },
    vhash:{
        type:String
    },
    assignTime:{
        type:Date,
        default:Date.now
    }
}
]
});
// defining the location as 2d sphere space to have two points in the coordinates.
userSchema.index({ "loc": "2dsphere" });
//sending the JSON specified parameters as required
// userSchema.methods.toJSON=function(){
//     var user=this;
//     var userObject=user.toObject();
//     return _.pick(userObject,['gender']);
// }
//creating a final model out of schema
var User = mongoose.model( "User", userSchema );

module.exports={User};
