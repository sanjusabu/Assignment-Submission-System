const db = require("../config/database");
const InsertUsers = async (store_type, email, hashedPassword) =>{
    try{
        await db.execute(`INSERT INTO Users(user_type,email,password) VALUES (?, ?, ?)`, [store_type, email, hashedPassword]);
        return
    } catch(error){
        throw new Error(error)
    }
}
const Checklogin = async(email, hashedPassword) => {
    try{
        userexists = await db.execute("SELECT * FROM User WHERE email = ? and password = ?", [email, hashedPassword]);
        existingUser =  userexists[0][0];
        if(!existingUser){
            throw new Error("Invalid credentials, could not log you in.")
        }
        // return {user : existingUser}
    } catch(error){
        throw new Error(error)
    }
}

exports.InsertUsers = InsertUsers
exports.Checklogin = Checklogin