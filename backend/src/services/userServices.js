const bcrypt = require("bcrypt");
const {UserDomain} = require("../domain")
const jwt = require("jsonwebtoken");
exports.UserSignup = async (password, email, type, phone) => {
    let store_type = 1;
    if (type === 'Tutor') {
        store_type = 1;
    } else if (type == 'Student'){
        store_type = 0;
    } else {
        throw new Error("Valid Params are 'Student' and 'Tutor'")
    }
    if (password.length < 6) {
        throw new Error("Password Length Should be greater than 5 Characters");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await UserDomain.InsertUsers(store_type,email,hashedPassword,phone)
        return { message: "User registered successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.UserLogin = async (email,password)=> {
    try{
      const existingUser = await UserDomain.Checklogin(email)
    //   console.log(existingUserID)
      const pass = await bcrypt.compare(password, existingUser.password);
      if (!pass) {
        throw new Error("Wrong Password, Try Again");
      }
    let token = jwt.sign({id: existingUser.UID},process.env.JWT_SECRET,{ expiresIn: "2h" });
    return token
    } catch (error) {
        // console.log("hello")
        throw new Error(error.message);
    }
}
