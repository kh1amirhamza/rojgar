const User = require('../models/user')

module.exports = {
     deleteUser(id, req, res){
    const query = { "_id": id } ;
      User.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
              res.end();
          }else{
              res.json({"message": id+" User is Deleted!"})
              res.end();
          }
      })
  },
  deleteAllUser( req, res){

 
    
  }
}