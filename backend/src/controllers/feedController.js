const { FeedServices } = require("../services");

exports.FeedDetails = async (req,res) => {
    const usertype = req.type
    const user_id = req.id
    const publish = req.query.publishedAt
    const status = req.query.status
    if(status ==  undefined || status == '') {status = 'All'}
    if(publish == undefined || publish == '') {publish = 'SCHEDULED'}

    try{
        const result = await FeedServices.FeedDetails(usertype,user_id,publish,status)
        return res.status(200).json({"Assignments": result})
    } catch(error){
        return res.status(500).json({"error": error.message})
     }
}