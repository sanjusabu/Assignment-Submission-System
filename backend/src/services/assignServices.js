const {AssignDomain} = require("../domain")
exports.CreateAssignment = async (ass_id,id,title, description,publishDate,deadlineDate, file,student_ids) => {
    let result;
    try {
        await AssignDomain.TeacherExists(teacher_id); 
        await AssignDomain.InsertAssignment(ass_id,id, description,title,publishDate,deadlineDate,file)
        if(student_ids.length != 0){
            await AssignDomain.AssignStudents(ass_id,studentsArray);
        }else {
            throw new Error('Please Enter the Students to be assigned');
        }
    } catch (error) {
           throw new Error(error);
    }
}