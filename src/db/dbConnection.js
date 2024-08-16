import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDatabase = async () => {
    try {
        const connectionString = `${process.env.MONGODB_URL}/${DB_NAME}`;
        console.log('connStr : ', connectionString);
        const connectionInstance = await mongoose.connect(connectionString);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1)
    }
}

export default connectDatabase