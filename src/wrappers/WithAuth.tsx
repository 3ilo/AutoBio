import React from 'react';
import { useState, useEffect } from "react";

export interface WithAuthProps {
    component: React.JSX.Element,
}

export default function withAuth(props: WithAuthProps) {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        fetch('/api/auth/checkToken', {credentials: 'include'}).then(res => {
          if (res.status === 200) {
            setLoading(false);
          } else {
            const error = new Error(res.statusText);
            throw error;
          }
        }).catch(err => {
          console.error(err);
          setLoading(false);
          setRedirect(true);
        });
    }, []);
    if (loading) {
        return null;
    }
    if (redirect) {
        window.location.href = "/";
        return <></>
    }
    else{
        return (
            <>{props.component}</>
        )
    }
}