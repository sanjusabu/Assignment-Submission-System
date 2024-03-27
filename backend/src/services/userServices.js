const bcrypt = require("bcrypt");
const {UserDomain} = require("../domain")
const UserSignup = async (password, email, type) => {
    let store_type = 1;
    if (type === 'Teacher') {
        store_type = 0;
    } 
    if (password.length < 6) {
        throw new Error("Password Length Should be greater than 5 Characters");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await UserDomain.InsertUsers(store_type,email,hashedPassword)
        return { message: "User registered successfully" };
    } catch (error) {
        throw new Error(error);
    }
};

const UserLogin = async (email,password)=> {
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser = UserDomain.Checklogin(email, hashedPassword)
    //   const pass = await bcrypt.compare(password, existingUser.password);
    //   if (!pass) {
    //     throw new Error("Wrong Password, Try Again");
    //   }
    } catch (error) {
        throw new Error(error);
    }
}

exports.UserSignup = UserSignup;
exports.UserLogin = UserLogin;