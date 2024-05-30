import { useState } from "react";

export const useToggle = (initialValue=false) => {
  const [value, setValue] = useState(initialValue);

  function toggleValue(newValue) {
    setValue(typeof newValue === "boolean" ? newValue : !value);
  }

  return [value, toggleValue];
};
