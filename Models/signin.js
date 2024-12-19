const mongoose =require('mongoose');
const userSchema = mongoose.Schema({
    firstname:{
        type : String,
        required : [true, "Please provide your FirstName"],
        trim : true,
        min : 3,
        max :20
    },
    lastname:{
        type : String,
        required : [true, "Please provide your LastName"],
        trim : true,
        min : 3,
        max :20
    },
    email:{
        type : String,
        required : [true, "Please provide your UserName"],
        trim : true,
        unique: true,
        lowercase: true
    },

    hash_password:{
        type: String,
        required: [true,"Please provide your Password"],
    }


},
{
    timestamps : true,
}) 
module.exports =mongoose.model('Signin',userSchema);