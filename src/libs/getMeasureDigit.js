export default function getMeasureDigit (unit) {
  switch (unit) {
    case "piece": {
      return 0;
    } case "price": {
      return 2;
    } case "mass": {
      return 3;
    } default : {
      return 2;
    }
  }
}

