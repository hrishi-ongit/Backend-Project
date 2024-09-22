import mongoose, {Schema}  from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
/*we can ue a mongoose middleware hook called Pre
just before the data is about to save, we can run this hook function to do operation on that data
ex. like encrypting a password
we are using such pre hook after the schema declaration
*/


// because Schema is already exported through mongoose. Else wd'hv used = new mongoose.Schema({})
//i.e we imported mongoose and there itself extracted the Schema
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true, //consumption of power/space is high
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
    index: true,
  },
  avatar: {
    type: String, //cloudinary service(3rd party)
    required: true,
  },
  avatar: {
    type: String,
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId, // mongoose.Schema.Types.ObjectId in not included Schema
      ref: "Video",
    },
  ],
  passWord: {
    type: String,
    required: [true, "Password is required"],
  },
  refreshToken: {
    type: String,
  },
},{timestamps: true}); 

/* userSchema.pre("save",()=>{}) problem with this callback is, it wont allow access of .this
.this is necessary to use the schema contexts which are to be used in manuplation
*/ 

//password encryption
userSchema.pre("save", async function(next){
    if(!this.isModified("passWord")) return next();
    this.passWord = await bcrypt.hash(this.passWord, 10);
    next();
})

//adding custom method, ex.isPasswordCorrect and add logic check password 
userSchema.methods.isPasswordCorrect = async function(passWord){
    return await bcrypt.compare(passWord, this.passWord)//passWord is given value, this.passWord is the value to compared against(db value)
}

//mostly token generator not takes much time, not required of await
//generate access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,// this _id is the mongodb id which is defaultly provided 
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
//generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}

export const User = mongoose.model("User", userSchema)