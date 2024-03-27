const fileUpload = require("../utils/fileUpload");
const db = require("../config/database");
exports.InsertAssignment = async (ass_id, id, description,title,publishDate,deadlineDate,file) =>{
    const insertJournal = `INSERT INTO Assignment_details(Aid,title,description,status, publish_date,created_by,deadline_Date,file)
    VALUES (?, ?, ?,?, ?, ?, ?)`;
    const status = 'ONGOING'
    if (publishDate != ''){
        status = 'SCHEDULED'
    }
    try
    {    
        if(file == null || file == ''){
            await db.execute(insertJournal, [ass_id,title,description,status, publishDate,id,deadlineDate,file]);
        }
        else{
            result = await fileUpload.Uploadfile(ass_id,file);
            await db.execute(insertJournal, [ass_id,title,description,status, publishDate,id,deadlineDate,result.secure_url]);    
        }
    }
    catch(err){
        throw new Error(err)
    }
}

exports.TeacherExists = async (id) => {
    try{
        const results = await db.execute("select * from Users where user_type = ? and Uid = ?",[1,id]);
        if(results[0].length == 0 ) throw new Error("Invalid Teacher ID")
        return 
    }
    catch(error){
        throw new Error(error)
    }
}
exports.AssignStudents = async (ass_id,students)=> {
    let str = ''
    for (let student of students){
        str += `(${ass_id}, ${student})`
    }
    try{
        let insertAssignmentsAssigned = `INSERT INTO Assigned(Aid,SID) VALUES ${str}`
        await db.execute(insertAssignmentsAssigned);
        return 
    }
    catch(error){
        throw new Error(error)
    }
}
exports.DeleteAssignment = async(ass_id)=>{
    try{
        const deleteAssignment = `Delete from Assignment_details where AID = ?`
        await db.execute(deleteAssignment, [ass_id])
    } catch(error){
        throw new Error('Error in Deleting Assignemnt')
    }
}