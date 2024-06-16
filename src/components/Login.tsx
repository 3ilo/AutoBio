import { useState } from "react";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEmail(value)
  }
  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassword(value)
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
          'Access-Control-Allow-Methods': 'OPTIONS,GET',
          'Access-Control-Allow-Origin': 'http://localhost:3001',
        },
        credentials: 'include',
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/";
        } else {
            res.text().then((text) => {
                const error = new Error(text);
                throw error;
            })
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }
    return (
      <form onSubmit={onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
       <input type="submit" value="Submit"/>
      </form>
    );
}