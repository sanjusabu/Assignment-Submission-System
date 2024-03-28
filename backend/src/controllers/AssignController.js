const {AssignServices} = require("../services")
const UUID = require("uuid")

exports.GetAssignmentDetails = async (req, res) => {
    const {ass_id} = req.body;
    const user_type = req.type
    const user_id = req.id

    try{
        const result = await AssignServices.GetAssignmentDetails(user_id, ass_id, user_type)
        return res.status(200).json({"Assigned": result})
    } catch(error){
        return res.status(500).json({"error": error})
     }
}
exports.CreateAssignment = async (req, res) => {
    // console.log(req.file);
    let {title, description,publishDate,deadlineDate, student_ids} = req.body;
    const ass_id = UUID.v4();
    const teacher_id = req.id;
    const user_type = req.type
    const file = req.file;
    student_ids = JSON.parse(student_ids)
    if(user_type == 0) return res.status(500).json({error: "Only a Tutor can create the assignment!!"})
    try{
        message = await AssignServices.CreateAssignment(ass_id,teacher_id,title, description,publishDate,deadlineDate, file,student_ids)
        return res.status(200).json({"message": "Assignment Created Successfully"})
    } catch(error){
       return res.status(500).json({"error": error.message})
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

