import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useColorMode } from "../hooks/useColorMode";
import { useFormInput } from "../hooks/useFormInput";
import { useKeyboard } from "../hooks/useKeyboard";
import { setPreferedLanguage } from "../utils/languageTools";
import TextInput from "../components/TextInput";

export default function Settings() {
  const { t, i18n } = useTranslation("settings");
  const { colorMode, changeColorMode, colorModes } = useColorMode(); 
  const { changeKeyboardLayout, keyboardLayout } = useKeyboard();

  const { props: testInputProps } = useFormInput({
    id: "test-input",
    label: t("typeHere"),
    type: "text"
  });

  function handleChangeLanguage(e) {
    const lng = e.target.value
    setPreferedLanguage(lng);
    i18n.changeLanguage(lng);
    changeKeyboardLayout(lng);
  };
  function handleChangeColorMode(e) {
    changeColorMode(e.target.value);
  };
  function handleChangeKeyboardLayout(e) {
    changeKeyboardLayout(e.target.value);
  };
  
  const languages = Object.entries(i18n.options.resources).map(([lng]) => lng);
  
  return(
    <>
      <Grid container sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Grid item xs={10} md={8} lg={6}>
          <Typography sx={{ mb: 5 }} component="h1" variant="h5">{t("settings")}</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={10} md={4} lg={3} sx={{ paddingLeft: "1rem", paddingRight: "1rem", mb: 7 }}>
          <FormControl fullWidth sx={{ mb: 7 }}>
            <InputLabel id="them-selector">{t("theme")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t("theme")}
              value={colorMode}
              onChange={handleChangeColorMode}
            >
              {
                colorModes.map(mode =>
                  <MenuItem 
                    key={mode}
                    value={mode}
                    sx={{ textTransform: "Capitalize" }}
                  > 
                    {mode}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="keyboard-language-label">{t("keyboardLanguage")}</InputLabel>
            <Select
              labelId="keyboard-language-label"
              id="keyboard-language-selector"
              label={t("keyboardLanguage")}
              value={keyboardLayout}
              onChange={handleChangeKeyboardLayout}
            >
              {
                languages.map(lng =>
                  <MenuItem 
                    key={lng}
                    value={lng}
                    sx={{ textTransform: "Capitalize" }}
                  > 
                    {lng}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
          <TextInput id="test-input" { ...testInputProps } />
        </Grid>
        <Grid item xs={10} md={4} lg={3} sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="language-label">{t("language")}</InputLabel>
            <Select
              labelId="language-label"
              id="theme-selector"
              label={t("language")}
              onChange={handleChangeLanguage}
              value={i18n.language}
            >
              {
                languages.map(lng =>
                  <MenuItem 
                    key={lng}
                    value={lng}
                    sx={{ textTransform: "Capitalize" }}
                  > 
                    {lng}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}   