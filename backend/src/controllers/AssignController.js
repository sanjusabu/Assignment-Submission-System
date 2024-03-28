const {AssignServices} = require("../services")

exports.GetAssignmentDetails = async (req, res) => {
    const {ass_id} = req.body;
    const user_type = req.query.usertype
    const user_id = req.id
    let types 
    if(user_type == 'Teacher'){
        types = 1
    } else if (user_type == 'Student'){
        types = 0
    } else {
        return res.status(500).json({"error": "Valid Params are 'Student' and 'Teacher'"})
    }
    try{
        const result = await AssignServices.GetAssignmentDetails(user_id, ass_id, types)
        return res.status(200).json({"Assigned": result})
    } catch(error){
        return res.status(500).json({"error": error})
     }
}
exports.CreateAssignment = async (req, res) => {
    // console.log(req.file);
    const {title, description,publishDate,deadlineDate, student_ids} = req.body;
    const ass_id = UUID.v4();
    const teacher_id = req.id;
    const file = req.file;
    try{
        message = await AssignServices.CreateAssignment(ass_id,teacher_id,title, description,publishDate,deadlineDate, file,student_ids)
        return res.status(200).json({"message": "Assignment Created Successfully"})
    } catch(error){
       return res.status(500).json({"error": error})
    }
}

exports.DeleteAssignment = async (req,res) => {
    const {id}  = req.body
    try{
        await AssignServices.DeleteAssignment(id)
        return res.status(200).json({"message": "Assignment Deleted Successfully"})
    } catch(error){
        return res.status(500).json({"error": error})
     }
}

