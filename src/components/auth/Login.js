import "./Login.css"
import { useRef, useState } from "react";
import { Button, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

export default function Login({ onLogin }) {
    const emailInputRef = useRef();
    const [error, setError] = useState(true);

    const loginHandler = () => {
        if (!emailInputRef.current.value.includes('@')) {
            setError(true);
            return;
        }

        setError(false);
        onLogin(emailInputRef.current.value);
    };

    return (
        <div className="LoginPage">
            <FormControl className="LoginForm" >
                <InputLabel htmlFor="email-input">Email address</InputLabel>
                <Input
                    inputRef={emailInputRef}
                    error={error}
                    id="email-input"
                    aria-describedby="my-helper-text"
                />
                {error ?
                    <FormHelperText error id="email-helper-text-error">Please enter a valid email.</FormHelperText> :
                    <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                }
                <Button variant="contained" color="primary" onClick={loginHandler}>Login</Button>
            </FormControl>
        </div>
    );
}