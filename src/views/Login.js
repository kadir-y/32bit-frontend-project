import { useState, useRef } from "react";
// import { useTranslation } from "react-i18next";

import {
  Grid,
  Box, 
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material"; // Grid version 1

import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Login as LoginIcon
} from "@mui/icons-material";

import logo from "../assets/logo.png"; // Logo 300x87 pixels

import "../stylesheets/Login.css";

import useFormInput from "../hooks/useFormInput";

// const user = {
//   userCode: "admin1234",
//   password: "admin1234"
// };

const { version: appVersion } = require('../../package.json');

function Login () {
  // const { t } = useTranslation("login");
  const [passwordError, setPasswordError] = useState("");
  const [userCodeError, setUserCodeError] = useState("");
  const userCodeProps = useFormInput("", () => { setUserCodeError("") });
  const passwordProps = useFormInput("", () => { setPasswordError("") });
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  function toggleShowPassword (e) {
    e.preventDefault();
    setShowPassword(show => !show);
    passwordRef.current.focus();
  }
  function hidePassword () {
    setShowPassword(false);
  }

  function handleClickLoginButton (e) {
    e.preventDefault();
    const userCode = userCodeProps.value
    const password = passwordProps.value
    let errCount = 0;
    if (userCode.trim().length < 8) {
      setUserCodeError("* Bu alan minimum 8 karakterden oluşmalıdır!");
      errCount++;
    }
    if (password.trim().length < 8) {
      setPasswordError("* Bu alan minimum 8 karakterden oluşmalıdır!");
      errCount++;
    }
    if (errCount === 0) {
    }
  } 
  return (
    <Grid container 
      sx={{ minHeight: "100vh", display: "flex", alignContent: "center", justifyContent: "space-evenly" }}
    >
      <Grid
        item xs={10} md={5} lg={4} xlg={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 0 } }}>
          <img className="logo" src={logo} alt="Logo" />
          <Typography variant="span" component="p" sx={{ mt: 2 }}>
            Version&nbsp;{appVersion}
          </Typography>
        </Box>
      </Grid>
      <Grid item 
        xs={10} sm={8} md={5} lg={4} xlg={3}
        component="form"
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h5">Hoşgeldiniz!</Typography>
          <Typography 
            variant="subtitle1"
            component="span"
          >
            Lütfen kullanıcı kodu ve şifrenizi giriniz.
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            fullWidth
            error={userCodeError.length > 0}
            helperText={ userCodeError ? userCodeError : '' }
            label="Kullanıcı Kodu"
            InputProps={{
              ...userCodeProps,
              type: "text",
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            error={passwordError.length > 0}
            helperText={ passwordError ? passwordError : 'Şifrenizi kimseyle paylaşmayın.' }
            label="Şifre"
            variant="outlined"
            onBlur={hidePassword}
            inputRef={passwordRef}
            InputProps={{
              ...passwordProps,
              type: showPassword ? "text" : "password",
              endAdornment: (
                <InputAdornment sx={{ cursor: "pointer" }} position="end" onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box>
          <Button variant="contained"
            size="large"
            startIcon={<LoginIcon/>}
            onClick={handleClickLoginButton}
          >GİRİŞ YAP</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;