const fileUpload = require("../utils/fileUpload");
const db = require("../config/database");

exports.GetTeacherAssignment =  async(ass_id)=> {
    try
    {    
        const Getassignment = `Select SID, file from Assigned where ass_id = ? and status = 'SUBMITTED'`
        const result = await db.execute(Getassignment, [ass_id])
        return result
    } catch(error){
        throw new Error(error)
    }
}
exports.GetStudentSubs =  async(user_id, ass_id)=> { 
    try 
    {    
        const Getassignment = `Select ass_id,file from Assigned where SID = ? and Aid = ? and status = 'SUBMITTED'`
        const result = await db.execute(Getassignment, [user_id, ass_id])
        return result
    } catch(error){
        throw new Error(error)
    }
}
exports.InsertAssignment = async (ass_id, id, description,title,publishDate,deadlineDate,file) =>{
    const insertJournal = `INSERT INTO Assignment_details(Aid,title,description,status, publish_date,created_by,deadline_Date,file)
    VALUES (?, ?, ?,?, ?, ?, ?, ?)`;
    let status = 'ONGOING'
    if (publishDate != ''){ //check for today
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
    // let studentsArray = Array.from(students);
    for (let i=0; i< students.length; i++){
        if(i != 0) str += `,`
        str += `('${ass_id}', ${students[i]})`
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