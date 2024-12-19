const userModel=require("../Models/user.model")
const jwt = require('jsonwebtoken');

generateWebToken =(_id)=>{
     return  jwt.sign({ 
        id: _id },
        process.env.JWT_SCRETE_TOKEN,{
            expiresIn: '1d'
        });

}
const signup = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  try {
      // Use await instead of a callback in exec
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
          return res.json({
              success: false,
              message: "User email already exists.",
          });
      }

      const _user = new userModel({
          email,
          firstname,
          lastname,
          password,
          username: Math.random().toString(),
      });
      
      const savedUser = await _user.save(); // Await the save operation
      var token = generateWebToken(savedUser._id);
      return res.json({
          success: true,
          message: "User successfully stored",
          data: {...savedUser,
            token: token
          }
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Some error occurred while running. Contact your administrator.",
      });
  }
};


const signin =async (req,res) =>{
    const {
        email,
        password,
    }=req.body;
    
    try{
        const user = await userModel.findOne({ email });
         if(user){
            const isAuthenticated = user.authenticate(password);
            var token = generateWebToken(user._id);
            if(isAuthenticated){
                return res.json({
                    success: true,
                    message: "uSer login Succesfully",
                    data:{user,
                        token: token}
                })
            }
            else{
                return res.json({
                    success: false,
                    message: "user Login failed. Bad authentication."
                })
            }
         }
         else{
            return res.json({
                success:false,
                message:"User Email does not exist."
            })
         }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred while running. Contact your administrator.",
        });
    }
    
}
module.exports = {
  signup,
  signin
};
