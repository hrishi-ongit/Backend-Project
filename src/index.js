import dotenv from "dotenv";
import connectDatabase from "./db/dbConnection.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})
//Connect to database
connectDatabase()
.then(()=>{
    const port = process.env.PORT || 8000;
    //listen to response
    app.listen(port, () => {
        console.log(`Server is running at prot : ${port}`)
    })
})
.catch((err)=>{
    //console log error
    console.log('Connection to Mongo Db failed !!', err);
})


/*
This is one approach of server and backend connection
import express from "express";
const app = express()

//here we will make use of IIFE, immediatly invoked function expression
//
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error)=>{//In case the db is connected but due to some error, the server not able to listen db
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR:", error)
        throw err
    }
})()
 */

//Proffesional approach

