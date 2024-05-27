import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Box, 
  TextField,
  InputAdornment,
  Typography
} from "@mui/material";
import LButton from "../components/LButton";
import {
  Visibility,
  VisibilityOff,
  AccountCircle
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import "../stylesheets/Login.css";
import useFormInput from "../hooks/useFormInput";
import useLocalStorage from "../hooks/useLocalStorage";

const { version: appVersion } = require("../../package.json");

function Login () {
  const { t } = useTranslation("login");
  const navigate = useNavigate()
  const setStoredToken = useLocalStorage("token")[1];
  const [passwordError, setPasswordError] = useState("");
  const [userCodeError, setUserCodeError] = useState("");
  const { props: userCodeProps, methods: { clear: clearUserCode }} = useFormInput("", () => { setUserCodeError("") });
  const { props: passwordProps, methods: { clear: clearPassword }} = useFormInput("", () => { setPasswordError("") });
  const userCode = userCodeProps.value;
  const password = passwordProps.value;
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  function toggleShowPassword (e) {
    e.preventDefault();
    setShowPassword(show => !show);
    passwordRef.current.focus();
  }
  function hidePassword () {
    setShowPassword(false);
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoggingIn(true);
    let errCount = 0;
    if (userCode.trim().length === 0) {
      setUserCodeError(t("inputRequiredError"));
      errCount++;
    } else if (userCode.trim().length < 6) {
      setUserCodeError(t("inputMinimumLengthError", { length: 6 }));
      errCount++;
    }
    if (password.trim().length === 0) {
      setPasswordError(t("inputRequiredError"));
      errCount++;
    } else if (password.trim().length < 8) {
      setPasswordError(t("inputMinimumLengthError", { length: 8 }));
      errCount++;
    }
    if (errCount === 0) {
      try {
        const res = await axios.post("api/users/login", { userCode, password });
        setStoredToken(res?.data?.token);
        navigate("/");
      } catch (err) {
        if (err.response.status === 401) {
          setPasswordError(t("passwordIncorrectError"));
          clearPassword();
        } else if (err.response.status === 404) {
          setUserCodeError(t("userNotFoundError"));
          clearUserCode();
          clearPassword();
        } else {
          console.error(err);
        }
      }
    }
    setIsLoggingIn(false);
  } 
  return (
    <>
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
              {t("version")}&nbsp;{appVersion}
            </Typography>
          </Box>
        </Grid>
        <Grid item 
          xs={10} sm={8} md={5} lg={4} xlg={3}
          component="form"
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h5">{t("welcome")}</Typography>
            <Typography 
              variant="subtitle1"
              component="span"
            >
              {t("description")}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField 
              fullWidth
              error={userCodeError.length > 0}
              helperText={ userCodeError ? userCodeError : "" }
              label={t("userCodeLabel")}
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
              helperText={ passwordError ? passwordError : t("passwordHelperText") }
              label={t("passwordLabel")}
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
            <LButton
              label={t("loginButton")}
              loadingLabel={t("loggingInButton")}
              isLoading={isLoggingIn}
              onClick={handleFormSubmit}
            ></LButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;