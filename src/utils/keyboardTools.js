export const setPreferedKeyboardLanguage = function (lng) {
  localStorage.setItem("prefered-keyboard-language", lng)
}

export const getPreferedKeyboardLanguage = function () {
  localStorage.getItem("prefered-keyboard-language")
}

export const clearPreferedKeyboardLanguage = function () {
  localStorage.removeItem("prefered-keyboard-language")
}

export const getKeyboardLayout = lng => require("../locales/" + lng + "/keyboard-layout.json")


export const getSystemLanguage = () => navigator.language || navigator.languages[0];