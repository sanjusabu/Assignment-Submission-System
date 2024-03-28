exports.GetTeacherFeed = async (id,publish) => {
    try{
        const getAssignment = `Select * from Assignment_details where created_by = ? and status = ?`
        const result = await db.execute(getAssignment, [id,publish])
        return result[0]
    } catch(error){
        throw new Error('Error in Deleting Assignemnt')
    }

}

exports.GetStudentFeed = async (user_id,status)=>{
    try{
        if (status == 'ALL'){
            const getAssignment = `Select * from Assigned where SID = ?`
            result = await db.execute(getAssignment, [user_id])
        } else if (status != 'OVERDUE'){
            const getAssignment = `Select * from Assigned where SID = ? and status = ?`
            result = await db.execute(getAssignment, [user_id,status])
        }  else {
            const getAssignment = `Select * from Assigned inner join Assignment_Details on Assigned.AID = Assignment_Details.AID where Assigned.SID = 1 and Assigned.status = 'PENDING' and Assignment_Details.deadline_date < now()`
            result = await db.execute(getAssignment, [user_id])                
        }
        return result[0]
    } catch(error){
        throw new Error('Error in Getting Assignment')
    }
}