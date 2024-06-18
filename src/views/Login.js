import {
  Grid,
  Box, 
  Typography
} from "@mui/material";
import LoadingButton from "../components/LoadingButton";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import { AccountCircle } from "@mui/icons-material";
import logo from "../assets/logo.png";
import "../stylesheets/Login.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormInput } from "../hooks/useFormInput";
import { useToggle } from "../hooks/useToggle";
import { useAuth } from "../hooks/useAuth";
import Keyboard from "../components/Keyboard";
import FloatingKeyboardButton from "../components/FloatingKeyboardButton";

import axios from "../axios";
import getErrorStatusCode from "../libs/getErrorStatusCode";
import { useEffect, useState } from "react";

function Login () {
  const { t } = useTranslation("login");
  const [loading, setLoading] = useToggle(false);
  const [version, setVersion] = useState();
  const { login } = useAuth();
  useEffect(() => {
    let ignore = false;
    async function fetchVersion () {
      const res = await axios.get("/version");
      if (ignore) return;
      setVersion(res.data?.version ? res.data?.version : "");
    }
    fetchVersion();
    return () => ignore = true;
  }, []);
  
  const { 
    value: usercode,
    clearValue: clearUsercode,
    setError: setUsercodeError,
    props: usercodeProps
  } = useFormInput({
    label: t("usercodeLabel"),
    type: "text"
  });
  const { 
    value: password,
    clearValue: clearPassword,
    setError: setPasswordError,
    props: passwordProps
  } = useFormInput({
    label: t("passwordLabel"),
    helperText: t("passwordHelperText"),
    type: "password"
  });

  const navigate = useNavigate()
  async function handleLoginButtonClick() {
    setLoading(true);
    
    const errors = {};

    // validate
    if (usercode.length === 0)
    errors.usercode = t("requiredError");
    else if (usercode.length < 8)
    errors.usercode = t("minimumLengthError", { length: 8 });

    if (password.length === 0)
    errors.password = t("requiredError");
    else if (password.length < 8)
    errors.password = t("minimumLengthError", { length: 8 });
  
    // if there is no error send request
    if (!errors.usercode && !errors.password) {
      try {
        const data = { password, usercode};
        const res = await axios.post("/users/login", data);
        const { user, token } = res.data
        login(user, token);
        navigate("/");
      } catch (err) {
        const status = getErrorStatusCode(err);
        if (status === 401) {
          errors.password = t("incorrectPassword");
          clearPassword();
        } else if (status === 404) {
          errors.usercode = t("userNotfound");
          clearPassword();
          clearUsercode();
        } else {
          errors.usercode = " ";
          errors.password = t("internalServerError");
        }
      }
    }

    // throw errors if necessary
    if (errors.usercode)
    setUsercodeError(errors.usercode);
    if (errors.password)
    setPasswordError(errors.password);

    setLoading(false);
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
              {t("version")}&nbsp;{version}
            </Typography>
          </Box>
        </Grid>
        <Grid item 
          xs={10} sm={8} md={5} lg={4} xlg={3}
          component="form"
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h5">{t("welcome")}</Typography>
            <Typography variant="subtitle1" component="span">{t("description")}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextInput
              id="usecode"
              autoComplete="username"
              autoFocus={true}
              endAdornment={<AccountCircle />}
              { ...usercodeProps }
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <PasswordInput 
              id="password"
              autoComplete="current-password"
              { ...passwordProps } 
            />
          </Box>
          <Box>
            <LoadingButton
              label={t("loginButton")}
              loadingLabel={t("loggingInButton")}
              isLoading={loading}
              onClick={handleLoginButtonClick}
            ></LoadingButton>
          </Box>
        </Grid>
      </Grid>
      <Keyboard />
      <FloatingKeyboardButton />
    </>
  );
}

export default Login;