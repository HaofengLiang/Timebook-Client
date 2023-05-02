import "./Login.css"
import { useRef } from "react";
import { Button, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

export default function Login({ onLogin }) {
    const emailInputRef = useRef();
    const loginHandler = () => {
        onLogin(emailInputRef.current.value);
    };

    return (
        <div className="LoginPage">
            <FormControl className="LoginForm" >
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input inputRef={emailInputRef} id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                <Button variant="contained" color="primary" onClick={loginHandler}>Login</Button>
            </FormControl>
        </div>
    );
}