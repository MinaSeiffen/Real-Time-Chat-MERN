import userModel from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/generateToken.js";

export const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.userName,
      profilePic: user.profilePic,
      MSG: "Successfully Logged in!",
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
export const signUp = async (req, res, next) => {
  try {
    const { fullName, userName, password, comfirmPassword, gender } = req.body;
    if (password !== comfirmPassword) {
      return res.status(400).json({ MSG: "passwords do not match" });
    }
    const user = await userModel.findOne({ userName: userName });
    if (user) {
      return res.status(400).json({ MSG: "Sorry,User Dublicated" });
    }

    // Hashing password before saving user data
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const boyProfileImg = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfileImg = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new userModel({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfileImg : girlProfileImg,
    });
    if (newUser) {
      //JWT token will be sent to the client side for authentication of users
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.userName,
        profilePic: newUser.profilePic,
        MSG: "Successfully Signed Up!",
      });
    } else {
      res.status(404).json({ MSG: "invaild User data" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const logoutUser = (req, res, next) => {
  try {
    res.cookie("jwt" , "" , {maxAge: 0})
    res.status(200).json({MSG:"Logged out Successfully!"});
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
