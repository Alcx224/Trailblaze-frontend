import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
    email: String,
    desc: String
})

const User = mongoose.model('User', userSchema);

export default User;