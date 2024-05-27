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
  ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Capslock", "z", "x", "c", "v", "b", "n", "m"],
  ["Space"]
]

function KRow ({ buttons, upperCase, toggleUpperCase }) {
  return (
    <Stack 
      direction="row"
      spacing={0.5}
      sx={{ display: "flex", justifyContent: "center", mb: 0.5, width: "100%" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      { buttons.map((b, index) => {
        if (b === "Capslock") {
          return (
            <KButton 
              sx={{ width: "4rem" }} key="capslockButton" variant={upperCase ? "contained" : "outlined" } 
              onClick={toggleUpperCase}>
              { upperCase ? <ArrowUpward /> : <ArrowDownward /> }
            </KButton>
          );
        }
        else if (b === "Space") {
          return (
            <KButton key="spaceButton"
              sx={{ width: "80%", minWidth: "10rem", maxWidth: "15rem" }}
              variant="outlined"
              startIcon={<SpaceBar />}
            >
              { b }
            </KButton>
          );
        } else {
          return (<KButton key={index} variant="outlined"> {upperCase ? b.toUpperCase() : b} </KButton>);
        }
      })}
    </Stack>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupKeyboard () {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivateUpperCases, setIsActivateUpperCases] = useState(false);
  function handleClose () {
    setIsOpen(false)
  }
  function toggleUpperCase () {
    setIsActivateUpperCases(!isActivateUpperCases);
  }
  setTimeout(() => {
    setIsOpen(true)
  }, 1000)
  return (<>
    <Dialog
      maxWidth="sm"
      fullWidth
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ textAlign: "center" }}
    >
      <DialogTitle>Keyboard</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter your user code.</DialogContentText>
        <Box sx={{ mt: 1, mb: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TextField fullWidth 
            size="small"
            label="User Code"
            sx={{ maxWidth: "15rem", mr: 1 }}
            ></TextField>
          <Button variant="contained" startIcon={<SubdirectoryArrowRight />}>Okey</Button>
        </Box>
        { keyboardRows.map((buttons, index) => 
          <KRow key={index} buttons={buttons} upperCase={isActivateUpperCases} toggleUpperCase={toggleUpperCase}/>
        )}
      </DialogContent>
    </Dialog>
  </>);  
}
