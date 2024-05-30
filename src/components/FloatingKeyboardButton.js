import { IconButton } from "@mui/material";
import { Keyboard } from "@mui/icons-material";
import { useKeyboard } from "../hooks/useKeyboard";
import { styled } from "@mui/material/styles";  

export default function FloatingKeyboardButton() {
  const { openKeyboard } = useKeyboard();
  function handleMouseDown() {
    openKeyboard();
  }
  const StyledIconButton = styled(IconButton)({
    position: "fixed",
    zIndex: 9999,
    bottom: "2rem",
    right: "2rem"
  })
  return (
    <StyledIconButton
      onMouseDown={handleMouseDown}
      size="large"
    >
      <Keyboard fontSize="large"/>
    </StyledIconButton>
  );
} 