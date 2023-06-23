
const asyncHandler = require("express-async-handler")
const Userss = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//desc Register a user
//route /api/users/register
//access public
const registerUser = asyncHandler(async (req,res) =>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    
    const userAvailable = await Userss.findOne({email})
    // const userAvailable = await Userss.find({ email }).limit(1);
    if(userAvailable){
        res.status(400)
        throw new Error("User is already registered")
    }

    // Hashing password, "10" is for no of solved rounds for hashing the password
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed password: ",hashedPassword)
    const User = await Userss.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log("user created : ", User)
    if(User){
        res.status(201).json({_id : User.id,email : User.email})
    }else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    // res.json({message: "Register the user"})
    
});


//desc login user
//route /api/users/login
//access public
const loginUser = asyncHandler(async (req,res) =>{
    const {email,password} = req.body
    if (!email|| !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const User = await Userss.findOne({email})
    // if the user is present then compare password
    if(User && (await bcrypt.compare(password,User.password))){
        const accessToken = jwt.sign({
            User:{
                username:User.username,
                email:User.email,
                id: User.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        // expiration time is passed of token because after this expiration time user should not be able call the API'S
        {expiresIn: "15m"}

        );
        res.status(200).json({accessToken})
    }else {
        res.status(401)
        throw new Error("email or password is not valid")
    }

});

//desc current user info
//route /api/users/current
//access private 
// to access the current user the client needs to pass a accesstoken
const currentUser = asyncHandler(async (req,res) =>{
    res.json(req.user)
});

module.exports = {registerUser, loginUser, currentUser }