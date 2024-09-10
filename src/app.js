import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

app.use(express.json({limit:"16kb"}));//limit of incomming json data
app.use(express.urlencoded({extended: true, limit: "16kb",}))//extended:true(optional) is the allowing depth object levels in url  
app.use(express.static("public"))//storing the public assets like img, favicon, etc in this file 
app.use(cookieParser())



//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use('/api/v1/users', userRouter)

export {app}
 //app.use >> for middleware config settings