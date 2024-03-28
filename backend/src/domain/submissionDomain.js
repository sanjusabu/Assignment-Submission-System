const fileUpload = require("../utils/fileUpload");
const db = require("../config/database");

exports.StudentExists = async (id) => {
    try{
        const results = await db.execute("select * from Users where user_type = ? and Uid = ?",[0,id]);
        if(results[0].length == 0 ) throw new Error("Invalid Student ID")
        return 
    }
    catch(error){
        throw new Error(error)
    }
}

exports.InsertSubmission = async (ass_id,user_id,file)=> {
    try{
        if(file == null || file == '') {
            throw new Error("Submission is empty")
        }
        let updateSubmission = `update Assigned set status = ?, file = ? where AID = ? and SID = ?`
        const result = await fileUpload.Uploadfile(ass_id,file);
        await db.execute(updateSubmission,['SUBMITTED',result.secure_url,ass_id, user_id]);
        return 
    }
    catch(error){
        throw new Error(error)
    }
}