import  jwt  from "jsonwebtoken";
import userModel from "../Models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).send({ msg: 'No Token Provided' });
        }
        const decoded = jwt.verify(token , process.env.JWT_TOKEN)
        
        if (!decoded) {
            return res.status(401).send({ msg:"Invalid JWT Token"})
        }

        const user = await userModel.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).send({ msg: 'No User Found' });
        }

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export default protectRoute