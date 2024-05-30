export default function removeCharAtPosition (inputRef, carretPosition) {
  const val = inputRef.current.value;
  const strStart = val.slice(0, carretPosition - 1);
  const strEnd = val.slice(carretPosition);
  inputRef.current.value = strStart + strEnd;
  carretPosition -= 1;
  inputRef.current.setSelectionRange(carretPosition, carretPosition);
  return carretPosition;
}