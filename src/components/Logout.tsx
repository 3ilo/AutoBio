import { useNavigate } from "react-router-dom";
import { logout } from '../services/authService'
import { useEffect } from 'react';

export interface LogoutProps {
    setLogoutStatus: (val: boolean) => void
}

export default function Logout(props: LogoutProps) {
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(
            (res) => res.status === 200 ? ( props.setLogoutStatus(false), navigate("/home") ) : console.log('could not log out')
        ).catch(
            (err) => console.log(err)
        )
    }, [])
    return <></>
}