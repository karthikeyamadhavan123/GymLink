import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
    component: React.ReactNode
}
const Protected: React.FC<ProtectedProps> = ({ component }) => {
    const router = useNavigate();
    useEffect(() => {
        const islogin = localStorage.getItem('user-storage');
        if (!islogin) {
            router('/api/auth/login')
        }
        if (islogin) {
            const role = JSON.parse(islogin)?.state.details.role;
            if (role === 'admin') {
                router('/admin-dashboard')
            }
        }
    }, [])
    return (
        <div>
            {component}
        </div>
    )
}

export default Protected
