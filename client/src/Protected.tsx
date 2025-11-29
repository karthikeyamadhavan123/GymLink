import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedProps } from "./types";


const Protected: React.FC<ProtectedProps> = ({ Component }) => {
    const router = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem('user-storage');
        if (!isLogin) {
            router('/api/auth/login')
        }
    }, [])
    return (
        <div>
            {Component}
        </div>
    )
}

export default Protected
