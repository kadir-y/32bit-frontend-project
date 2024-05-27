import { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowUpward,
  ArrowDownward,
  SpaceBar,
  SubdirectoryArrowRight
} from '@mui/icons-material';
import { useKeyboard } from "../hooks/useKeyboard";
const KButton = styled(Button)({
  width: "2.7rem",
  height: "2.5rem",
  minWidth: 0,
  padding: 0,
  textTransform: "none",
  textWrap: "nowrap",
  boxSizing: "border-box"
});
const keyboardRows = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  ["Capslock", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
  ["Space"]
]
function KRow({ buttons, upperCase, toggleUpperCase, handleKeyClick, handleSpaceClick }) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ display: "flex", justifyContent: "center", mb: 0.5, width: "100%" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {buttons.map((b, index) => {
        if (b === "Capslock") {
          return (
            <KButton
              sx={{ width: "4rem" }} key="capslockButton" variant={upperCase ? "contained" : "outlined"}
              onClick={toggleUpperCase}>
              {upperCase ? <ArrowUpward /> : <ArrowDownward />}
            </KButton>
          );
        }
        else if (b === "Space") {
          return (
            <KButton key="spaceButton"
              sx={{ width: "80%", minWidth: "10rem", maxWidth: "15rem" }}
              variant="contained"
              startIcon={<SpaceBar />}
              onClick={handleSpaceClick}
            >
              {b}
            </KButton>
          );
        } else {
          const keyValue = upperCase && typeof b === "string" ? b.toUpperCase() : b
          return (<KButton key={index}
            variant="outlined"
            onClick={() => handleKeyClick(keyValue)}
          >
            {keyValue}
          </KButton>);
        }
      })}
    </Stack>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function PopupKeyboard() {
  const { keyboardIsOpen, closeKeyboard, focusedInputData, setFocusedInputValue, focusedInputValue } = useKeyboard();
  const [isActivatedUpperCases, setIsActivatedUpperCases] = useState(false);
  let [showError, setShowError] = useState(true)
  function toggleUpperCase() {
    setIsActivatedUpperCases(!isActivatedUpperCases);
  }
  function handleOkeyClick() {
    closeKeyboard();
    focusedInputData.setValue(focusedInputValue);
    focusedInputData.addHandleChangeEvent();
    setShowError(true)
  }
  function handleChange(e) {
    setFocusedInputValue(e.target.value);
    setShowError(false)
  }
  function handleKeyClick(key) {
    setFocusedInputValue(focusedInputValue + key);
  }
  function handleSpaceClick() {
    setFocusedInputValue(focusedInputValue + " ");
  }
  showError = showError && focusedInputData.error.length > 0
  return (<>
    <Dialog
      fullWidth
      maxWidth="sm"
      open={keyboardIsOpen ? true : false}
      TransitionComponent={Transition}
      sx={{ textAlign: "center" }}
    >
      <DialogTitle>Keyboard</DialogTitle>
      <DialogContent>
        <DialogContentText
          color={showError ? "error" : "grey"}
          sx={{ mb: 2 }}
        >
          {showError ? focusedInputData.error : focusedInputData.helperText}
        </DialogContentText>
        <Box sx={{ mt: 1, mb: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TextField fullWidth
            size="small"
            label={focusedInputData.label}
            sx={{ maxWidth: "15rem", mr: 1 }}
            error={showError}
            inputProps={{
              onChange: handleChange,
              type: focusedInputData.type,
              value: focusedInputValue
            }}
          ></TextField>
          <Button variant="contained" startIcon={<SubdirectoryArrowRight />} onClick={handleOkeyClick}>Okey</Button>
        </Box>
        {keyboardRows.map((buttons, index) =>
          <KRow key={index} buttons={buttons}
            upperCase={isActivatedUpperCases}
            toggleUpperCase={toggleUpperCase}
            handleKeyClick={handleKeyClick}
            handleSpaceClick={handleSpaceClick}
          />
        )}
      </DialogContent>
    </Dialog>
  </>);
}
