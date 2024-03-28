const {SubmissionServices} = require("../services")

exports.AddSubmission = async()=> {
    const {ass_id} = req.body
    const userid = req.id
    file = req.file
    try{
        message = await SubmissionServices.CreateSubmission(ass_id,userid,file)
        return res.status(200).json({"message": "Assignment Created Successfully"})
    } catch(error){
       return res.status(500).json({"error": error})
    }
}