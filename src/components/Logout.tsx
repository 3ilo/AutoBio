import { useNavigate } from "react-router-dom";
import { logout } from '../services/authService'
import { useEffect } from 'react';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(
            (res) => res.status === 200 ? navigate("/home") : console.log('could not log out')
        ).catch(
            (err) => console.log(err)
        )
    }, [])
    return <></>
}