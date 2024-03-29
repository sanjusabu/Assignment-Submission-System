let {AssignServices} = require("../services")
let UUID = require("uuid")

exports.GetAssignmentDetails = async (req, res) => {
    let ass_id = req.query.assignmentId;
    let user_type = req.type
    let user_id = req.id

    try{
        let result = await AssignServices.GetAssignmentDetails(user_id, ass_id, user_type)
        return res.status(200).json({"Assigned": result})
    } catch(error){
        return res.status(500).json({"error": error.message})
     }
}
exports.CreateAssignment = async (req, res) => {
    // console.log(req.file);
    let {title, description,publishDate,deadlineDate, student_ids} = req.body;
    let ass_id = UUID.v4();
    let teacher_id = req.id;
    let user_type = req.type
    let file = req.file;
    if(student_ids != undefined )student_ids = JSON.parse(student_ids)
    title = title || "";
    description = description || "";
    publishDate = publishDate || null;
    deadlineDate = deadlineDate || null;
    student_ids = student_ids || [];
    file = file || ""
    if(user_type == 0) return res.status(500).json({error: "Only a Tutor can create the assignment!!"})
    try{
        message = await AssignServices.CreateAssignment(ass_id,teacher_id,title, description,publishDate,deadlineDate, file,student_ids)
        return res.status(200).json({"message": "Assignment Created Successfully"})
    } catch(error){
       return res.status(500).json({"error": error.message})
    }
}
exports.UpdateAssignment = async (req, res) => {
    let {assignmentId, title, description,publishDate,deadlineDate} = req.body;
    let teacher_id = req.id;
    let user_type = req.type
    if(assignmentId == undefined) return res.status(500).json({error: "Please Provide the Assignment Id"});
    title = title || "";
    description = description || "";
    publishDate = publishDate || "";
    deadlineDate = deadlineDate || "";

    if(user_type == 0) return res.status(500).json({error: "Only a Tutor can create the assignment!!"})
    try{
        message = await AssignServices.UpdateAssignment(assignmentId,title,description,publishDate,deadlineDate)
        return res.status(200).json({"message": "Assignment Updated Successfully"})
    } catch(error){
       return res.status(500).json({"error": error.message})
    }
}
exports.DeleteAssignment = async (req,res) => {
    let assignmentid  = req.query.assignmentid
    try{
        await AssignServices.DeleteAssignment(assignmentid)
        return res.status(200).json({"message": "Assignment Deleted Successfully"})
    } catch(error){
        return res.status(500).json({"error": error.message})
     }
}

