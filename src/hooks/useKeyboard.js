import { createContext, useContext, useState } from "react";
import { useDisableProperty } from "./useDisableProperty";
import { useToggle } from "./useToggle";
import { 
  setPreferedKeyboardLayout,
  getPreferedKeyboardLayout,
  getSystemLayout
} from "../utils/keyboardTools"

const KeyboardContext = createContext();

let initialKeyboardLayout;
const preferedKeyboardLayout = getPreferedKeyboardLayout();
initialKeyboardLayout = preferedKeyboardLayout ? preferedKeyboardLayout : getSystemLayout();

export const KeyboardProvider = function ({ children }) {
  const { enable: enableInput, disable: disableInput } = useDisableProperty();
  const [isOpen, setIsOpen] = useToggle();
  const [keyboardLayout, setKeyboardLayout] = useState(initialKeyboardLayout);
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
  function changeKeyboardLayout(layout) {
    setKeyboardLayout(layout);
    setPreferedKeyboardLayout(layout);
  }

  return (
    <KeyboardContext.Provider value={{ 
      openKeyboard,
      closeKeyboard,
      isOpen,
      inputData,
      setInputData,
      changeKeyboardLayout,
      keyboardLayout
    }}>
      {children}
    </KeyboardContext.Provider>
  );
};
export const useKeyboard = () => {
  return (useContext(KeyboardContext));
};
