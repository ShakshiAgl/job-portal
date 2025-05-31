import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//User registration
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exist with this email.',
        success: false,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role:role.toLowerCase(),
    });
    return res.status(201).json({
      message: "Acount created successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
     return res.status(500).json({ message: "Internal server error", success: false });
  }
};

//User login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      })
    };

    //Check role is correct or not 
    if (role.toLowerCase() !== user.role.toLowerCase()) {
      return res.status(400).json({
        message: "Account doesn't exist with current role. ",
        success: false
      })
    };

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res
    .status(200)
    .cookie("token", token, {
       maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'
       })
       .json({
      message: `Welcome ${user.fullname}`,
      success: true,
      user,
      token
    })

  } catch (error) {
    console.log(error);
  }
}

//User logout
export const logout = async (req,res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge:0}).json({
      message: "Logged out successfull",
      success : true,
    
    })
  } catch (error) {
    console.log(error);
  }
}

// updating the profile 
export const updateProfile = async (req,res) => {
  try { 
     const {fullname, email, phoneNumber, bio, skills} = req.body;
     const file = req.file;

     //Cloudinary 
      let skillsArray;
     if(skills){
     skillsArray = skills.split(",");
     }
     const userId = req.id;  
      let user = await User.findOne({ email });


     if(!user){
      return res.status(400).json({
        message : "User not found.",
        success : false
      })
     }
     //Updating the data 
     if(fullname) user.fullname = fullname
     if(email) user.email = email
     if(phoneNumber) user.phoneNumber = phoneNumber
     if(bio) user.profile.bio = bio
     if(skills) user.profile.skills = skillsArray

     await user.save();

      user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }
    return res.status(200).json({
      message : "Profile update successfully",
      user,
      success : true 
    })
  } catch (error){
      console.log(error);
  }
}

