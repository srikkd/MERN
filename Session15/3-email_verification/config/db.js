const mongoose = require("mongoose");

const url = "mongodb+srv://<db_username>:<db_password>@cluster0.qzal9ta.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(url);
        // await mongoose.model("users").init();   // Ensure Mongoose creates indexes
        // await conn.connection.db.collection("users").createIndex({ email: 1 }, { unique: true });
        console.log(`Connected with MongoDB: ${conn.connection.host}`);        
        // console.log(db.users.getIndexes());
        console.log(await conn.connection.db.collection("users").indexes());
        
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDB;