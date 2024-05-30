import { createContext, useContext, useState } from "react";
import { useDisableProperty } from "./useDisableProperty";

const KeyboardContext = createContext();

export const KeyboardProvider = function ({ children }) {
  const { enable: enableInput, disable: disableInput } = useDisableProperty();
  const [isOpen, setIsOpen] = useState(false);
  const plainData = { 
    id: "",
    label: "",
    error: "",
    helperText: "",
    value: "",
    type: "",
    ignore: true,
    setValue: () => {},
    setError: () => {},
  };
  const [inputData, setInputData] = useState(plainData);
  function openKeyboard () {
    // THIS FUNCTION MUST BE USED WITH "onMouseDown" EVENT! 
    if (!inputData.ignore) {
      disableInput(inputData.id);
      setIsOpen(true);
    }
  }
  function closeKeyboard () {
    enableInput(inputData.id);
    setIsOpen(false);
  }

  return (
    <KeyboardContext.Provider value={{ 
      openKeyboard,
      closeKeyboard,
      isOpen,
      inputData,
      setInputData
    }}>
      {children}
    </KeyboardContext.Provider>
  );
};
export const useKeyboard = () => {
  return (useContext(KeyboardContext));
};
