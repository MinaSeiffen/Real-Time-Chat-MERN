import userModel from "../Models/user.model.js";

export const getUserForSideBar = async (req , res , next)=>{
    try {
        const loggedInUser = req.user._id
        const allUsers = await userModel.find({_id: {$ne : loggedInUser}}).select("-password")

        res.status(200).json({allUsers})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}