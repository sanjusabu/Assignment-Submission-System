const {SubmissionDomain} = require("../domain")
exports.CreateSubmission = async(ass_id,user_id,file) => {
    try{
        // await SubmissionDomain.StudentExists(user_id)// check if student
        await SubmissionDomain.InsertSubmission(ass_id,user_id,file)// create submission for student
    }catch(error){
        throw new Error(error);
    }
}

