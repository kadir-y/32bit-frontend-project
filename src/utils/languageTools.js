export const setPreferedLanguage = function (lng) {
  localStorage.setItem('prefered-language', lng)
}

export const getPreferedLanguage = function () {
  localStorage.getItem('prefered-language')
}

export const clearPreferedLanguage = function () {
  localStorage.removeItem('prefered-language')
}

export const getSystemLanguage = () => navigator.language || navigator.languages[0];