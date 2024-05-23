import { useState } from "react";

export default function useFormInput (initialValue, addHandleChangeEvent = () => {}) {
  const [value, setValue] = useState(initialValue);
  function handleChange (e) {
    setValue(e.target.value);
    addHandleChangeEvent();
  }
  function clear () {
    setValue("");
  }
  return {
    props: {
      value,
      onChange: handleChange
    },
    methods: {
      clear
    }
  };
}