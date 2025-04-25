import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminProtectedProps {
    component: React.ReactNode
}
const AdminProtected: React.FC<AdminProtectedProps> = ({ component }) => {
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
            {component}
        </div>
    )
}

export default AdminProtected
