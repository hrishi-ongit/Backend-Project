import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiErrors.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler( async (req, res) =>{
    // res.status(200).json({
    //     message:'ok'
    // })

    //logic for registering user :-
    //get user details from user input/ui
    //validations
    //check if user already exists (with unique username/email)
    //check for images, check for avatar
    //Upload it to cloudinary, check if it is uploaded correctly
    //Create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return response

    const {fullName, email, username, passWord} = req.body;
    console.log("email: ", email);
    console.log("pwd: ", passWord);

    if(
        [fullName, email, username, passWord].some((field) => 
        field?.trim() === '')
        //.some is a callback, here its returning boolean value 
        //like if any of the field satisfies the condition, it will return true
        //with true we understand that required field is not present   
    ){
        throw new ApiError(400, 'All fields are required');
    }
    //further any validations

    const existingUser = User.findOne({
        $or:[{username}, {email}]
    })

    if(existingUser) throw new ApiError(409, 'user with email or username already exist');

    // req.body..this comes with express where as multer middleware also gives us
    //a method ..files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0].path;
    console.log(avatarLocalPath);
    console.log(coverImageLocalPath);


    if(!avatarLocalPath) throw new ApiError(400, 'Avatar file is required');

    //uplade to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) throw new ApiError(400, 'Avatar file is required');
    
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '', //because we have not ensured coverImage required from user
        email,
        passWord,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-passWord -refreshToken"
    )
    //.select syntax with string chooses the fields except those that are passed to it in string with -
    //i.e in abose case passWord and refreshToken are removed

    if(!createdUser) throw new ApiError(500, 'Something went wrong while registering user')
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User register successfully')
    )


})

export {registerUser}