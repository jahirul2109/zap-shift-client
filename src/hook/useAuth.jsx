import { useContext } from "react"
import { AuthContext } from "../provider/AuthContext"

 const useAuth =()=> {
    const userInfo = useContext(AuthContext);
    return userInfo ;
}