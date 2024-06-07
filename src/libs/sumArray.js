export default function sumArray(arr, field) {
  let sum = 0;
  if (field.includes("*")) {
    const [f0, f1] = field.split("*")
    arr.forEach(item => {
      sum += item[f0] * item[f1];
    });
  } else {
    arr.forEach(item => {
      sum += (field  ? item[field] : item);
    });
  }
  return sum;
}