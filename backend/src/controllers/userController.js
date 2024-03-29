const {UserServices} = require("../services")
require("dotenv").config();

exports.signup = async (req, res) => {
    let { password, email, phone} = req.body;
    const type = req.query.type
    phone = phone || ""
    let store_type 
    if (type === 'Tutor') {
      store_type = 1;
    } else if (type == 'Student'){
        store_type = 0;
    } else {
      return res.status(500).json({ error: "Valid Params are 'Student' and 'Tutor'" });
    }
    try {
      const result = await UserServices.UserSignup(password, email, store_type,phone);
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


