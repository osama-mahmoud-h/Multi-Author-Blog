const User = require('../../model/User')
const Visistor = require('../../model/Visistor')


exports.usersCount = async(req,res,next)=>{
    try {
      const userscount = await User.countDocuments();
      
      return res.status(200).json({
        success:true,
        usersCount:userscount
      });
  
    } catch (err) {
      return res.status(err.statusCode||500).json({
        success:false,
        error: err.message
      });
    }
  }


exports.visitorsCount = async(req,res,next)=>{
    try {
      const visitorscount = await Visistor.countDocuments();
      
      return res.status(200).json({
        success:true,
        visitorsCount:visitorscount
      });
  
    } catch (err) {
      return res.status(err.statusCode||500).json({
        success:false,
        error: err.message
      });
    }
}