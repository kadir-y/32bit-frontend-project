import { useState } from "react";
import { useKeyboard } from "./useKeyboard";

export const useFormInput = function (props = {}) {
  const initialValue = props.initialValue ? props.initialValue : "";
  const label = props.label ? props.label : "";
  const helperText = props.helperText ? props.helperText : "";
  const type = props.type ? props.type : "text";

  const { setInputData } = useKeyboard();
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  
  const data = {
    label,
    error,
    helperText,
    type,
    setValue,
    setError
  }

  function clearValue() {
    setValue("");
  }
  function clearError() {
    setError("");
  }
  function handleBlur(e) {
    setInputData({
      ...data,
      id: e.target.id,
      value: e.target.value,
      ignore: true
    });
  }
  function handleFocus(e) {
    setInputData({
      ...data, 
      id: e.target.id,
      value: e.target.value,
      ignore: false
    });
  }
  function handleChange(e) {
    setValue(e.target.value);
    setInputData({ 
      ...data,
      id: e.target.id,
      value: e.target.value,
      ignore: false
    });
    clearError();
  }

  return { 
    setValue,
    clearValue,
    value,
    setError,
    clearError,
    error,
    props: { 
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      helperText,
      label,
      value,
      error
    }};
}
