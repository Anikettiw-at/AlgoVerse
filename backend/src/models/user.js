const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20,
    },
    emailId:{
        type:String,
        // required:true,
        required: [true, "Email is required"],
        unique:true,
        trim: true,
        lowercase:true,
        immutable: true,
    //      match: [
    //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //   "Invalid email format"
    // ],
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    // problemSolved:{
    //     type:[{
    //         type:Schema.Types.ObjectId,
    //         ref:'problem',
    //         unique:true       //  iski wjh se signup me problem
    //     }],
    // }
    
    problemSolved: {
  type: [
    {
      type: Schema.Types.ObjectId,
      ref: "problem"
    }
  ],
  default: []
}

    ,
    password:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
      await mongoose.model('submission').deleteMany({ userId: userInfo._id });
    }
});


const User = mongoose.model("user",userSchema);

module.exports = User;
