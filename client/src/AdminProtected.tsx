import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
    component: React.ReactNode
}
const Protected: React.FC<ProtectedProps> = ({ component }) => {
    const router = useNavigate();
    useEffect(()=>{
        const user = localStorage.getItem('user-storage');
        if(user){
            const role = JSON.parse(user)?.role;
            if (role !=='admin') {
                router('/')
            }
        }
    },[])
    return (
        <div>
            {component}
        </div>
    )
}

export default Protected
