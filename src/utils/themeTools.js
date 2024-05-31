export const setPreferedTheme = function (theme) {
  localStorage.setItem("prefered-theme", theme)
}

export const getPreferedTheme = () => localStorage.getItem("prefered-theme");

export const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark"  : "light";