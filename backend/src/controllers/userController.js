const jwt = require("jsonwebtoken");
const {UserServices} = require("../services")
require("dotenv").config();

const signup = async (req, res) => {
    const { password, email, type} = req.body;
    try {
      const result = await UserServices.UserSignup(password, email, type);
      return res.status(200).json({ message: result.message });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    try{
    await UserServices.UserLogin(email,password)
    } catch(error){

    }
    let token = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
      );

    // console.log(existingUser.id + " " + "possible?");
  
    res.json({token, userid: existingUser.id});
}


exports.signup = signup;
exports.login = login;

