const { FeedServices } = require("../services");

exports.FeedDetails = async (req,res) => {
    const usertype = req.query.usertype
    const publish = req.query.publishedAt
    const status = req.query.status
    let user;
    if(usertype == 'Teacher'){
        user = 1
    } else if (usertype == 'Student'){
        user = 0
    } else {
        return res.status(500).json({"error": "Valid Params are 'Student' and 'Teacher'"})
    }
    try{
        const result = await FeedServices.FeedDetails(user,publish,status)
        return res.status(200).json({"Assignments": result})
    } catch(error){
        return res.status(500).json({"error": error})
     }
}