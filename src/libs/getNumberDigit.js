export default function getDigit(number) {
  return Math.floor(Math.log10(number)) + 1;
};