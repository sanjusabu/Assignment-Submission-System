const { FeedDomain } = require("../domain");

exports.FeedDetails = async (user_id,publish,status)=> {
    try {        
    if(user == 1){
        const result = await FeedDomain.GetTeacherFeed(user_id,publish)
        return result
    } else {
        //
        const result = await FeedDomain.GetStudentFeed(user_id,status)
        return result
    }
    } catch (error) {
           throw new Error(error);
    }
}