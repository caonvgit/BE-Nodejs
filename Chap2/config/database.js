const mongoose = require('mongoose');
module.exports.connect = async()=>{
  try {
 await mongoose.connect(process.env.BASE_URL )
    console.log(" connect thanh cong")
  } catch (error) {
    console.log(" connect that bai")
    
  }
}
