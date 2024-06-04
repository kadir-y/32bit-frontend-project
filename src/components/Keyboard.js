import { forwardRef, useEffect, useRef, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, Box, Stack,
  Button, Divider, Slide, Menu,
  MenuItem, Fade
} from "@mui/material";
import {
  ArrowUpward, ArrowDownward,
  SpaceBar, SubdirectoryArrowRight,
  Backspace, ArrowDropUp, ArrowDropDown
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../hooks/useKeyboard";
import { useToggle } from "../hooks/useToggle";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";
import addCharAtPosition from "../libs/addCharAtPosition";
import removeCharAtPosition from "../libs/removeCharAtPosition";
import { getKeyboardLayout } from "../utils/keyboardTools";

let keyboardCarretPosition = 0;

function LanguageMenu({ inputRef }) {
  const { changeKeyboardLayout, keyboardLayout } = useKeyboard();
  const { t, i18n } = useTranslation("keyboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const languages = Object.entries(i18n.options.resources).map(([lng]) => lng);
  
  function handleClick (e) {
    setAnchorEl(e.currentTarget);
  };
  function handleClose() {
    setAnchorEl(null);
  };
  function handleMenuItemClick(layout) {
    changeKeyboardLayout(layout);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ textTransform: "none" }}
      >
        {t("language")},&nbsp;{keyboardLayout}
        { open ? <ArrowDropUp /> : <ArrowDropDown /> }
      </Button>
      <Menu
        id="language-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >{languages.map(lng => 
        <MenuItem 
          key={lng}
          onClick={()=>{ handleMenuItemClick(lng) }}
      >{lng}</MenuItem>)}</Menu>
    </>
  );
}

function Input ({ inputRef}) {
  const { inputData } = useKeyboard();
  const [keyboardInputVal, setKeyboardInputVal] = useState("");
  const [keyboardInputError, setKeyboardInputError] = useState("");
  let { error, label, value, helperText, type } = inputData;

  useEffect(() => {
    setKeyboardInputVal(value);
    setKeyboardInputError(error);
  }, [error, value])

  function handleChange(e) {
    setKeyboardInputVal(e.target.value);
    setKeyboardInputError("");
    keyboardCarretPosition = e.target.selectionStart;
  }
  function handleClick(e) {
    keyboardCarretPosition = e.target.selectionStart;
  }
  function handleMouseDown (e) {
    e.stopPropagation();
  }

  const inputProp = {
    onChange: handleChange,
    onMouseDown: handleMouseDown,
    onClick: handleClick,
    id: "keyboard-input",
    size: "small",
    fullWidth: true,
    value: keyboardInputVal,
    error: keyboardInputError ? " " : "",
    sx: { 
      maxWidth: "15rem",
      mr: 1
    },
    label,
    inputRef
  }

  return (
    <>
      <Box
        component="form" 
        sx={{ mt: 1, mb: 1, display: "flex",  justifyContent: "center" }}
      >
        {
          type === "password" ? 
            <PasswordInput autoComplete="keyboard-password" {...inputProp} /> :
            <TextInput {...inputProp} /> 
        }
        <OkeyButton inputRef={inputRef} />
      </Box>
      <DialogContentText
        color={keyboardInputError ? "error" : "grey"}
        sx={{ width: "100%", textAlign: "center", mb: 3 }}
      >
        {keyboardInputError ? keyboardInputError : helperText}
      </DialogContentText>
    </>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function BackspaceButton({ inputRef }) {
  function handleMouseDown() {
    keyboardCarretPosition = removeCharAtPosition(inputRef, keyboardCarretPosition);
  }
  return (
    <Button
      sx={{ 
        width: "4rem",
        height: "2.5rem",
        minWidth: 0,
        padding: 0,
        textTransform: "none",
        textWrap: "nowrap",
        boxSizing: "border-box"
      }}
      variant={"contained"}
      onMouseDown={handleMouseDown}
    ><Backspace /></Button>
  );
}

function CapslockButton ({ upperCase, toggleUpperCase }) {
  function handleMouseDown() {
    toggleUpperCase();
  }
  return (
    <Button
      sx={{ 
        width: "4rem",
        height: "2.5rem",
        minWidth: 0,
        padding: 0,
        textTransform: "none",
        textWrap: "nowrap",
        boxSizing: "border-box"
      }}
      variant="contained"
      onMouseDown={handleMouseDown}
    >
      {upperCase ? <ArrowUpward /> : <ArrowDownward />}
    </Button>
  );
}

function KeyboardButton({ children, value, inputRef }) {
  function handleMouseDown () {
    keyboardCarretPosition = addCharAtPosition(inputRef, value, keyboardCarretPosition);
  }
  return (
    <Button
      sx={{ 
        width: "2.7rem",
        height: "2.5rem",
        minWidth: 0,
        padding: 0,
        textTransform: "none",
        textWrap: "nowrap",
        boxSizing: "border-box"
      }}  
      variant="contained"
      onMouseDown={handleMouseDown}
    >
      {children}
    </Button>
  );
}

function SpaceButton({ inputRef }) {
  function handleMouseDown () {
    keyboardCarretPosition = addCharAtPosition(inputRef, " ", keyboardCarretPosition);
  }
  return (
    <Button
      sx={{
        width: "80%",
        height: "2.5rem",
        minWidth: "10rem",
        maxWidth: "15rem",
        padding: 0,
        textTransform: "none",
        textWrap: "nowrap",
        boxSizing: "border-box"
      }}
      variant="contained"
      startIcon={<SpaceBar />}
      onMouseDown={handleMouseDown}
    ></Button>
  );
}

function OkeyButton({ inputRef }) {
  const { t } = useTranslation("keyboard");
  const { closeKeyboard, inputData } = useKeyboard(); 
  function handleClick() {
    closeKeyboard();
    inputData.setValue(inputRef.current.value);
    inputData.setError("");
    inputData.onOkeyButtonClick(inputRef.current.value);
  }
  return (
    <Button 
      variant="contained"
      startIcon={<SubdirectoryArrowRight />}
      onClick={handleClick}
    >{t("okey")}</Button>
  );
}

function KeyboardRows ({ inputRef, layout: lng }) {
  const [upperCase, toggleUpperCase] = useToggle();
  const layout = getKeyboardLayout(lng);
  const cases = upperCase ? layout.upperCase : layout.lowerCase;
  return (
    cases.map((buttons, index) =>
      <KeyboardRow 
        key={index}
        buttons={buttons}
        inputRef={inputRef}
        upperCase={upperCase}
        toggleUpperCase={toggleUpperCase}
      />
    )
  );
}

function KeyboardRow({ buttons, inputRef, toggleUpperCase, upperCase }) {
  return (
    <Stack
      direction="row"
      spacing={0.4}
      sx={{ display: "flex", justifyContent: "center", mb: 0.8, width: "100%" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {buttons.map((b, index) => {
        if (b === "Capslock") {
          return (
            <CapslockButton
              key="Capslock"
              upperCase={upperCase}
              toggleUpperCase={toggleUpperCase}
            />
          );
        }
        else if (b === "Backspace") {
          return (
            <BackspaceButton 
              key="backpace"
              inputRef={inputRef}
            />
          )
        }
        else if (b === "Space") {
          return (
            <SpaceButton
              inputRef={inputRef}
              key="space"
            ></SpaceButton>);
        } else {
          const keyValue = upperCase && typeof b === "string" ? b.toUpperCase() : b
          return (
            <KeyboardButton
              key={index}
              value={keyValue}
              inputRef={inputRef}
            >{keyValue}</KeyboardButton>
          );
        }
      })}
    </Stack>
  );
}

export default function Keyboard() {
  const { t } = useTranslation("keyboard");
  const { isOpen, keyboardLayout } = useKeyboard();
  const inputRef = useRef(null);
  
  function handleMouseDown(e) {
    e.preventDefault();
  }
  useEffect(() => {
    setTimeout(() => {
      if (isOpen) {
        inputRef.current.focus();
        keyboardCarretPosition = inputRef.current.value.length;
      }
    }, 1)
  }, [isOpen])
  
  function handleTransitionEnd() {
    
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      TransitionComponent={Transition}
      onTransitionEnd={handleTransitionEnd}
      onMouseDown={handleMouseDown}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <span>{t("keyboard")}</span>
        <LanguageMenu inputRef={inputRef} />
      </DialogTitle>
      <DialogContent>
        <Input inputRef={inputRef}/>
        {isOpen && <KeyboardRows inputRef={inputRef} layout={keyboardLayout}/>}
      </DialogContent>
    </Dialog>
  );
}
