const maskify = (secret: string): string => {
  const secretLength = secret.length;
  const visibleThreshold = 4;

  if (secretLength <= visibleThreshold) return secret;

  const hiddenLength = secretLength - visibleThreshold;

  const hiddenString = secret.slice(0, hiddenLength);
  const visibleString = secret.slice(
    secretLength - visibleThreshold,
    secretLength,
  );

  const codedString = hiddenString.replace(/./g, "*");

  return codedString + visibleString;
};

// TESTING AREA

const testInputOne = "4556364607935616"; // "************5616"
const testInputTwo = "64607935616"; // "*******5616"
const testInputThree = "1"; // "1"
const testInputFour = ""; // ""
const testInputFive = "Skippy"; // "**ippy"
const testInputSix = "Nananananananananananananananana Batman!"; // "************************************man!"

console.log(maskify(testInputOne));
console.log(maskify(testInputTwo));
console.log(maskify(testInputThree));
console.log(maskify(testInputFour));
console.log(maskify(testInputFive));
console.log(maskify(testInputSix));
