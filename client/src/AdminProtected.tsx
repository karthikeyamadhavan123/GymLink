import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedProps } from "./types";

const AdminProtected: React.FC<ProtectedProps> = ({ Component }) => {
    const router = useNavigate();
    useEffect(()=>{
        const user = localStorage.getItem('user-storage');
        if(!user){
            router('/api/auth/login')
        }
        if(user){
            const role = JSON.parse(user)?.state.details.role;      
            if (role !=='admin') {
                router('/not-authorized')
            }
        }
    },[router])
    return (
        <div>
            {Component}
        </div>
    )
}

export default AdminProtected
