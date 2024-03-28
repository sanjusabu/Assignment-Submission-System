const {SubmissionServices} = require("../services")

exports.AddSubmission = async(req,res)=> {
    const file = req.file
    const ass_id = req.body.assignmentId
    const userid = req.id
    // console.log(file, ass_id)
    try{
        message = await SubmissionServices.CreateSubmission(ass_id,userid,file)
        return res.status(200).json({"message": "Assignment Submitted Successfully"})
    } catch(error){
       return res.status(500).json({"error": error.message})
    }
}