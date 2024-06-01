import { TextField, InputAdornment } from "@mui/material";

export default function Input (props) {
  const error = props.error ? props.error : false;
  const label = props.label ? props.label : "";
  const helperText = props.helperText ? props.helperText : "";
  const variant = props.variant ? props.variant : "outlined";
  const fullWidth = props.fullWidth === "boolean" ? props.fullWidth : true;
  const endAdornment = props.endAdornment ? props.endAdornment : "";
  const autoComplete = props.autoComplete ? props.autoComplete : "";
  const value = props.value ? props.value : "";  
  const id = props.id ? props.id : "";
  const size = props.size ? props.size : "medium";
  const inputRef = props.inputRef ? props.inputRef : null;
  const sx = props.sx ? props.sx : {};
  const autoFocus = props.autoFocus ? props.autoFocus : false;

  const onBlur = props.onBlur ? props.onBlur : () => {};
  const onFocus = props.onFocus ? props.onFocus : () => {};
  const onChange = props.onChange ? props.onChange : () => {};
  const onMouseDown = props.onMouseDown ? props.onMouseDown : () => {};
  const onClick = props.onClick ? props.onClick : () => {};
  
  function handleChange(e) {
    onChange(e);
  }
  function handleFocus(e) {
    onFocus(e);
  }
  function handleBlur(e) {
    onBlur(e);
    if (inputRef)
    onChange({ target: inputRef.current });
  }
  function handleMouseDown(e) {
    onMouseDown(e);
  }
  function handleClick(e) {
    onClick(e);
  }

  return (
    <TextField
      id={id}
      size={size}
      sx={sx}
      inputRef={inputRef}
      fullWidth={fullWidth}
      error={error.length > 0}
      helperText={error.length > 0 ? error.trim() : helperText}
      label={label}
      variant={variant}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      InputProps={{
        autoComplete,
        autoFocus,
        value,
        type: "text",
        endAdornment: (
          <InputAdornment position="end">{ endAdornment }</InputAdornment> 
        )
      }}
    />
  );
}