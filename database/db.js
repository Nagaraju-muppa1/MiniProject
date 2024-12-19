const mongoose=require('mongoose')
const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s8zct.mongodb.net/${process.env.DB_NAME}`

mongoose.connect(url)
  .then(() => console.log("DB Connection Successful"))
  .catch((error) => console.error("Connection Error", error));

const dbConn=mongoose.connection;



module.exports=dbConn;