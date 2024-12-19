const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
/*
user Schema
 @attributes
 first name
 last name
 email
 ph no
 hash_password
 username
 role/type 

 bcrypt is  a package that helps to hash your password

*/

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

    username: {
        type: String,
        required: [true,"Please provide your Username"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    role :{
        type: String,
        enum:["user","admin","super-admin"]
    },

    contact_number:{
        type: String
    },

    hash_password:{
        type: String,
        required: [true,"Please provide your Password"],
    }


},
{
    timestamps : true,
}) 
/*
  virtuals are properties not stored in the database.
  They are only logically stored to perform computations on the document
  fields.
  virtual is a part of package in mongoose.not a part of mongodb.
  so,never stored on mongodb.
  client --> node server [server.js --> route --> controllers --> model, save data in db]


*/
userSchema.virtual('password').set(function (password){
    const hash_password = bcrypt.hashSync(password, 12) ;
    this.set('hash_password',hash_password);
    console.log(this);
    console.log(this.hash_password);
})

userSchema.virtual('fullname').get(function() {
    return `${this.firstname} ${this.lastname}`;
}).set(function (fullname){
    this.firstname = fullname.split(' ')[0];
    this.lastname  = fullname.split(' ')[1];
})


userSchema.methods={
    authenticate: function(password) {
        return bcrypt.compare(password, this.hash_password);
    }
}
module.exports =mongoose.model('User',userSchema);