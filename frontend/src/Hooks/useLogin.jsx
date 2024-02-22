import toast from "react-hot-toast"
import { useAuthContext } from "../Context/AuthContext"
import { useState } from "react"

const useLogin = () => {
    const [loading , setLoading] = useState(false)
    const {authUser, setAuthUser} = useAuthContext()

    const login = async (userName , password)=>{
        const success = handleInputErrors({ userName , password})
        if (!success) return
        setLoading(true)
        try {
            const res = await fetch ("/api/auth/login" , {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({userName,password}),
            })

            const data = await res.json()   

            if (data.error) {
                throw new error(data.error)
            }
            
            if (res.status === 404) {
                toast.error("User not found");
                return;
            }

            if (res.status === 401) {
                toast.error("Invalid Password");
                return;
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)

            
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return {loading , login }
}

export default useLogin

function handleInputErrors({userName , password }){
    if (!userName || !password ) {
        toast.error("Please, fill all inputs")
        return false
    }

    return true;
}
