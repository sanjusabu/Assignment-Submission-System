const {AssignDomain} = require("../domain")

exports.GetAssignmentDetails = async (user_id,ass_id, types)=> {
    try{
        if (types == 1) { // teacher
           const result =  await AssignDomain.GetTeacherAssignment(ass_id)
           return result
        } else {
            const result =  await AssignDomain.GetStudentSubs(user_id,ass_id)
            return result
        }
    } catch(error) {
        throw new Error(error);
 }
}
exports.CreateAssignment = async (ass_id,id,title, description,publishDate,deadlineDate, file,student_ids) => {
    try {
        await AssignDomain.InsertAssignment(ass_id,id, description,title,publishDate,deadlineDate,file)
        if(student_ids.length != 0){
            await AssignDomain.AssignStudents(ass_id,student_ids);
        }else {
            throw new Error('Please Enter the Students to be assigned');
        }
    } catch (error) {
           throw new Error(error);
    }
}

exports.UpdateAssignment = async (AssignmentId,title,description,publishDate,deadlineDate) => {
    try {
        await AssignDomain.UpdateAssignment(AssignmentId,title,description,publishDate,deadlineDate)
    } catch (error) {
           throw new Error(error);
    }
}

exports.DeleteAssignment = async (ass_id)=> {
    try {
       await AssignDomain.DeleteAssignment(ass_id)
    } catch (error) {
           throw new Error(error);
    }
}
