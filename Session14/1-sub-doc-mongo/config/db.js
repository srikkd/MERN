const mongoose = require("mongoose");

const url = "mongodb+srv://saurabh:saurabh@cluster0.qzal9ta.mongodb.net/sub-doc-db?retryWrites=true&w=majority&appName=Cluster0";

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
