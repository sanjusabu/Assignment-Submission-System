const {UserServices} = require("../services")
require("dotenv").config();

exports.signup = async (req, res) => {
    let { password, email, phone} = req.body;
    console.log(password)
    const type = req.query.type
    if(phone == undefined) phone = ''
    try {
      const result = await UserServices.UserSignup(password, email, type,phone);
      return res.status(200).json({ message: result.message });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
      const token = await UserServices.UserLogin(email,password)
      return  res.status(200).json({token});
    } catch(error){
      return res.status(500).json({ error: error.message });
    }
}


