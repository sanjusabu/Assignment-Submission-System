const db = require("../config/database");

exports.GetTeacherFeed = async (id,publish) => {
    try{
        const result = await db.execute(`Select * from Assignment_details where created_by = ? and status = ?`, [id,publish])
        // console.log(result)
        return result[0]
    } catch(error){
        throw new Error('Error in Getting Teacher Feed: ', error)
    }

}

exports.GetStudentFeed = async (user_id,status)=>{
    try{
        let result
        if (status == 'ALL'){
            const getAssignment = `Select * from Assigned where SID = ?`
            result = await db.execute(getAssignment, [user_id])
        } else if (status != 'OVERDUE'){
            const getAssignment = `Select * from Assigned where SID = ? and status = ?`
            result = await db.execute(getAssignment, [user_id,status])
        }  else {
            const getAssignment = `Select * from Assigned inner join Assignment_Details on Assigned.AID = Assignment_Details.AID where Assigned.SID = ? and Assigned.status = 'PENDING' and Assignment_Details.deadline_date < now()`
            result = await db.execute(getAssignment, [user_id])                
        }
        return result[0]
    } catch(error){
        throw new Error('Error in Getting Assignment', error)
    }
}