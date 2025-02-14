import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: true
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }

},{timestamps: true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 8);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password);

}

userSchema.methods.generateRefreshToken = function(){
    return JsonWebTokenError.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }

    )}

    userSchema.methods.generateRefreshToken = function(){
        return JsonWebTokenError.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
    
        )}

        userSchema.methods.toJSON = function(){
            const user = this.toObject();
            delete user.password;
            delete user.refreshToken;
            return user;
        }

export const User = mongoose.model("User", UserSchema);

