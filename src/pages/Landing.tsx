import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from '../services/authService'

const Landing = () => {
    const navigate = useNavigate();
    useEffect(() => {
        checkToken().then(
            (res) => res.status === 200 ? navigate("/home") : navigate("/login")
        ).catch(
            (err) => console.log(err)
        )
    }, [])
    return <></>
}

export { Landing }