//Function that connects with the database.
import { mongoose } from "mongoose";

async function connectToMongoDB(uri){
    try{
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    }
    catch(e){
        console.log(e);
    }
}

export {
    connectToMongoDB
}