export default function addCharAtPosition (inputRef, value, carretPosition = 0) {
  const val = inputRef.current.value;
  const char = val[carretPosition] ? val[carretPosition] : "" ;
  const strStart = val.slice(0, carretPosition);
  const strEnd = val.slice(carretPosition + 1);
  inputRef.current.value = strStart + value + char + strEnd;
  carretPosition += 1;
  inputRef.current.setSelectionRange(carretPosition, carretPosition);
  return carretPosition;
}