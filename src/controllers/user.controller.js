import { asyncHandler } from "../utils/asyncHandler.js";

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

    const {fullName, email, username, password} = req.body;
    console.log("email: ", email);
    console.log("pwd: ", password);

})

export {registerUser}