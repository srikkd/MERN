const mongoose = require("mongoose");

const url = "mongodb+srv://<db_username>:<db_password>@cluster0.qzal9ta.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(url);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch(err){
        console.log(err);
        
    }
}

//Better way to know for sure whether the connection has been established without any erro
module.exports = connectDB;
