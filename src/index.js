// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDatabase from "./db/dbConnection.js";

dotenv.config({
    path: './env'
})

console.log('Befor connection, mongoUri: ', process.env.MONGODB_URL)
connectDatabase();


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

