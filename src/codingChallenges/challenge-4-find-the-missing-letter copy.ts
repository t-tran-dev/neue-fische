const findMissingLetter = (charArray: string[]): string | undefined => {
  if (charArray.length < 2) return undefined;
  let lastCharCode = charArray[0].charCodeAt(0);

  for (let i = 1; i < charArray.length; i++) {
    const nextExpectedCharCode = lastCharCode + 1;
    const currentCharCode = charArray[i].charCodeAt(0);

    if (nextExpectedCharCode !== currentCharCode) {
      const foundLetter = String.fromCharCode(nextExpectedCharCode);
      return foundLetter;
    }

    lastCharCode = currentCharCode;
  }
};

// TESTING AREA

const testInputOne = ["a", "b", "c", "d", "f"]; // 'e'
const testInputTwo = ["O", "Q", "R", "S"]; // 'P'

console.log(findMissingLetter(testInputOne));
console.log(findMissingLetter(testInputTwo));
