import { useState } from "react";

export default function useFormInput (initialValue, addHandleChangeEvent = () => {}) {
  const [value, setValue] = useState(initialValue);
  function handleChange (e) {
    setValue(e.target.value);
    addHandleChangeEvent();
  }
  return {
    value,
    onChange: handleChange
  };
}