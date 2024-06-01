export const setPreferedKeyboardLayout = function (lng) {
  localStorage.setItem("prefered-keyboard-layout", lng)
}

export const getPreferedKeyboardLayout = () => localStorage.getItem("prefered-keyboard-layout")

export const clearPreferedKeyboardLayout = function () {
  localStorage.removeItem("prefered-keyboard-layout")
}

export const getKeyboardLayout = lng => require("../locales/" + lng + "/keyboard-layout.json")

export const getSystemLayout = () => navigator.language || navigator.languages[0];