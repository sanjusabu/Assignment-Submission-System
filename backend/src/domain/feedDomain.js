exports.GetTeacherFeed = async (id,publish) => {
    try{
        const getAssignment = `Select * from Assignment_details where created_by = ? and status = ?`
        const result = await db.execute(getAssignment, [id,publish])
        return result[0]
    } catch(error){
        throw new Error('Error in Deleting Assignemnt')
    }

    return answer
}