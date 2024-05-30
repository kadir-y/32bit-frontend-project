export const useDisableProperty = function () {
  function disable (id) {
    window.document
      .getElementById(id)
      .setAttribute("disabled", "disabled");
  }
  function enable (id) {
    window.document
      .getElementById(id)
      .removeAttribute("disabled", );
  }
  return { enable, disable };
}