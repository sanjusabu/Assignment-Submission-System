const fileUpload = require("../utils/fileUpload");
const db = require("../config/database");

exports.GetTeacherAssignment =  async(ass_id)=> {
    try
    {    
        const Getassignment = `Select Sid,file from Assigned where Aid = ? and status = 'SUBMITTED'`
        const result = await db.execute(Getassignment, [ass_id])
        return result[0]
    } catch(error){
        throw new Error(error)
    }
}
exports.GetStudentSubs =  async(user_id, ass_id)=> { 
    try 
    {    
        const Getassignment = `Select Aid,file from Assigned where Sid = ? and Aid = ? and status = 'SUBMITTED'`
        const result = await db.execute(Getassignment, [user_id, ass_id])
        return result[0]
    } catch(error){
        throw new Error(error)
    }
}
exports.InsertAssignment = async (ass_id, id, description,title,publishDate,deadlineDate,file) =>{
    const insertJournal = `INSERT INTO Assignment_Details(Aid,title,description,status, publish_date,created_by,deadline_Date,file)
    VALUES (?, ?, ?,?, ?, ?, ?, ?)`;
    let status = 'ONGOING'
    let today = new Date();
    if (publishDate != null){ //check for today
        let publish = new Date(publishDate);
        if (publish > today) {
            status = 'SCHEDULED';
        }
    } else publishDate = today
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
    catch(error){
        throw new Error(`Error while Inserting Assignment: ${error.message}`)
    }
}
exports.UpdateAssignment = async (AssignmentId,title,description,publishDate,deadlineDate)=>{
    try {
    
        if (title != "" || description != "" || publishDate != "" || deadlineDate != "") {
            let updateQuery = "UPDATE Assignment_Details SET ";
            let updateValues = [];
            if (title != "") {
                updateQuery += "title = ?, ";
                updateValues.push(title);
            }
            if (description != "") {
                updateQuery += "description = ?, ";
                updateValues.push(description);
            }
            if (publishDate != "") {
                updateQuery += "publish_Date = ?, ";
                updateValues.push(publishDate);
            }
            if (deadlineDate != "") {
                updateQuery += "deadline_Date = ?, ";
                updateValues.push(deadlineDate);
            }
            updateQuery = updateQuery.slice(0, -2);
            updateQuery += " WHERE Aid = ?";
            updateValues.push(AssignmentId);
            await db.execute(updateQuery, updateValues);
        }
    } catch (error) {
        throw new Error(`Error while Updating Assignment: ${error.message}`);
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
        let insertAssignmentsAssigned = `INSERT INTO Assigned(Aid,Sid) VALUES ${str}`
        await db.execute(insertAssignmentsAssigned);
        return 
    }
    catch(error){
        throw new Error(`Check if students exist ${error.message}`)
    }
}
exports.DeleteAssignment = async(ass_id)=>{
    try{
        const deleteAssignment = `Delete from Assignment_Details where Aid = ?`
        await db.execute(deleteAssignment, [ass_id])
    } catch(error){
        throw new Error(`Error in Deleting Assignment ${error.message}`)
    }
}