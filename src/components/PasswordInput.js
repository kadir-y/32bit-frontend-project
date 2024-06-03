import { useToggle } from "../hooks/useToggle";
import { 
  FormControl,
  InputAdornment,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordInput (props) {
  const [showPassword, toggleShowPassword] = useToggle();
  
  // Props
  const error = props.error ? props.error : "";
  const label = props.label ? props.label : "";
  const helperText = props.helperText ? props.helperText : "";
  const variant = props.variant ? props.variant : "outlined";
  const fullWidth = props.fullWidth === "boolean" ? props.fullWidth : true;
  const value = props.value ? props.value : "";
  const id = props.id ? props.id : "";
  const size = props.size ? props.size : "medium";
  const inputRef = props.inputRef ? props.inputRef : null;
  const sx = props.sx ? props.sx : {};
  const autoComplete = props.autoComplete ? props.autoComplete : "";

  // Event
  const onBlur = props.onBlur ? props.onBlur : () => {};
  const onFocus = props.onFocus ? props.onFocus : () => {};
  const onChange = props.onChange ? props.onChange : () => {};
  const onMouseDown = props.onMouseDown ? props.onMouseDown : () => {};
  const onClick = props.onClick ? props.onClick : () => {};

  function handleBlur(e) {
    onBlur(e);
    if (inputRef)
    onChange({ target: inputRef.current });
  }
  function handleChange(e) {
    onChange(e);
  }
  function handleFocus (e) {
    onFocus(e);
  }
  function handleMouseDown(e) {
    onMouseDown(e);
  }
  function handleClick(e) {
    onClick(e);
  }
  // Events for show password button.
  function handleMouseDownShow(e) {
    e.preventDefault();
    toggleShowPassword();
    if (inputRef)
    onChange({ target: inputRef.current });
  }


  return (
    <FormControl 
      fullWidth={fullWidth}
      variant={variant}
      error={error.length > 0}
      sx={sx}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        value={value}
        id={id}
        size={size}
        inputRef={inputRef}
        autoComplete={autoComplete}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={handleMouseDownShow}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      { (helperText || error.trim())  &&
        <FormHelperText>
          { error && typeof error !== "boolean" ? error : helperText }
        </FormHelperText>
      }
    </FormControl>
  );
}