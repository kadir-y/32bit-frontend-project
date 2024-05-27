import { useState } from "react";
import { useKeyboard } from "./useKeyboard";

export default function useFormInput ({ initialValue, helperText, label, error }, addHandleChangeEvent = () => {}) {
  const [value, setValue] = useState(initialValue);
  const { setFocusedInputData, setFocusedInputValue } = useKeyboard();
  function handleChange (e) {
    setValue(e.target.value);
    addHandleChangeEvent();
    setFocusedInputData({
      type: e.target.type,
      helperText,
      label,
      error,
      setValue,
      addHandleChangeEvent
    });
    setFocusedInputValue(e.target.value);
  }
  function handleOnFocus (e) {
    setFocusedInputData({
      type: e.target.type,
      helperText,
      label,
      error,
      setValue,
      addHandleChangeEvent
    });
    setFocusedInputValue(e.target.value);
  }
  function clear () {
    setValue("");
  }
  return {
    props: {
      value,
      onChange: handleChange,
      onFocus: handleOnFocus
    },
    methods: {
      clear
    }
  };
}