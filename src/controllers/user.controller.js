import { User } from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
 
const registerUser = asyncHandler( async (req,res) => {

    //We need to perform following steps in order to register a user

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    //We're taking details from frontend, and as frontend isn't there we can give data using postman
    const {fullName,email,username,password} = req.body
    console.log(email,fullName,username,password);

    //checking if any field is left empty 
    // (using the optional chaining ?. to avoid errors if field is null or undefined),
    // and then removes any leading or trailing whitespace using trim()
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "" )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //chceks for the username or email in the database if they are unique 
    //as in this step we're talking to database we use await as its in another continent
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    //here the existedUser stores boolean value

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files); 

    //req.files is given to us by multer 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    //avatarLocalPath stores local file path as it has not been uploaded on cloudinary yet
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //uploading takes time so await
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }


    //entering data into db by passing object 

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })
    
    //Here we are checking if user is really created by _id which is automatically assigned to data in db 
    //in select("") inside quotes we put a - sign and add those fields we dont want to get stored
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


const loginUser = asyncHandler( async (req,res) => {

})

export {
    registerUser,
    loginUser
}
