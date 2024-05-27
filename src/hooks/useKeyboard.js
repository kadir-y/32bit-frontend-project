import { createContext, useContext, useState } from "react";
const KeyboardContext = createContext();
export const KeyboardProvider = function ({ children }) {
  const plainFocusedInputData = { type: "text", value: "", label: "", helperText: "", error: "" }
  const [focusedInputValue, setFocusedInputValue] = useState("");
  const [focusedInputData, setFocusedInputData] = useState(plainFocusedInputData);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  function openKeyboard () {
    if (focusedInputData.label || focusedInputData.helperText || focusedInputData.value) {
      setKeyboardIsOpen(true); 
    }
  }
  function closeKeyboard () {
    setKeyboardIsOpen(false);
    setFocusedInputData(plainFocusedInputData);
  }
  return (
    <KeyboardContext.Provider value={{ 
      openKeyboard,
      closeKeyboard,
      setFocusedInputData,
      focusedInputData,
      keyboardIsOpen,
      focusedInputValue,
      setFocusedInputValue
    }}>
      {children}
    </KeyboardContext.Provider>
  );
};
export const useKeyboard = () => {
  return (useContext(KeyboardContext));
};
