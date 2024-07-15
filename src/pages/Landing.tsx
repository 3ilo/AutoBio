import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/api/auth/checkToken', {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
            'Access-Control-Allow-Methods': 'OPTIONS,GET',
            'Access-Control-Allow-Origin': 'http://localhost:3001',
          },
          credentials: 'include',
        }).then(
            (res) => res.status === 200 ? navigate("/home") : navigate("/login")
        ).catch(
            (err) => console.log(err)
        )
    }, [])
    return <></>
}

export { Landing }