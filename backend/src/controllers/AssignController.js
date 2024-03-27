const {AssignServices} = require("../services")
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