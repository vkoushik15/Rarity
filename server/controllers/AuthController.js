/*const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register =async(req,res)=>{
const{name,email,password}=req.body
const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password,salt)
    req.body.password= hashedPass
    const newuser = new userModel(req.body)
    
try {
    const olderuser = await userModel.findOne({name})
    if(olderuser){
        return res.status(400).json({message:"user already exists"})
    }
    const User = await newuser.save()
    const token = jwt.sign(
        {name:userModel.name,id:userModel._id},
        'hiimcreatinghtisagain',
        {expiresIn:"30d"}
    )
    res.status(200).json({user,token})

} catch (error) {
    res.status(400).json({message:error.message})
}


}
const Login = async(req,res)=>{
 const {name,password}= req.body
 try {
    const User = await userModel.findOne({name:name})
    if(User){
        const validity = await bcrypt.compare(password,user.password)
        if(!validity){
            res.status(400).json('wrong password')
        }
        else{
            const token = jwt.sign(
                {name:User.name, id:User._id},
                 'hiimcreatinghtisagain',
                 {expiresIn:"30d"}
            )
            res.status(200).json({User,token})
        }
    }
    else{
        res.status(404).send('user not found')
    }
 } catch (error) {
    res.status(500).send(error)
    console.log(error)
 }


}
module.exports ={register,Login}
*/
const userModel = require('../models/userModel');
const itemModel = require('../models/itemModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
// Register Function
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const olderUser = await userModel.findOne({ name });
    if (olderUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({ name, email, password: hashedPass });
    const User = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { name: User.name, id: User._id },
      process.env.JWT_SECRET || 'defaultsecretkey',
      { expiresIn: "30d" }
    );

    res.status(200).json({ user: User, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login Function
const Login = async (req, res) => {
  const { name, password } = req.body;

  // Validate input
  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user by name
    const User = await userModel.findOne({ name });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const validity = await bcrypt.compare(password, User.password);
    if (!validity) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: User.name, id: User._id },
      process.env.JWT_SECRET || 'defaultsecretkey',
      { expiresIn: "30d" }
    );

    res.status(200).json({ user: User, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};


const searchUsers = async (req, res) => {
  try {
    const  search  = req.query.text; 
    console.log(search)
    if (!search) {
      return res.status(400).json({ error: "Search parameter is required" });
    }

  
    const users = await userModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },]
       
    });

    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the found users
    
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getUserdata = async(req,res)=>{
  try {
    const { id } = req.params;

    // Validate the provided id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Fetch the user data from the database
    const user = await userModel.findById(id).select('-password'); // Exclude password for security

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user data
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Server error' });
  }
  

}
const getuserposts = async(req,res)=>{

 const{id: userid} =req.params
// console.log('userid is ',userid)
 try {
  const user = await itemModel.find({userId:userid})
 // console.log('posts are',user)
  if(user){
    res.status(200).send(user)
  }
  else{
    res.status(404).send('usernot found')
  }
 } catch (error) {
  res.status(400).send('ualbe to get the posts')
  
 }
}

module.exports = { register, Login ,searchUsers,getUserdata,getuserposts};
