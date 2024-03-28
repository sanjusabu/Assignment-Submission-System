const db = require("../config/database");
exports.InsertUsers = async (store_type, email, hashedPassword,phone) =>{
    try{
        await db.execute(`INSERT INTO Users(user_type,email,password,phone) VALUES (?, ?, ?,?)`, [store_type, email, hashedPassword,phone]);
        return
    } catch(error){
        throw new Error(error.message)
    }
}
exports.Checklogin = async(email) => {
    try{
        const userexists = await db.execute("SELECT * FROM Users WHERE email = ? ", [email]);
        
        if (userexists.length === 0 || userexists[0].length == 0) {
            throw new Error("Invalid credentials, could not log you in.");
        }
        existingUser =  userexists[0][0];  
        return existingUser
    } catch(error){
        throw new Error(error.message)
    }
}
