const extractnumbers = (str: string): number => Number(str.replace(/\D/g, ""));

const sortWordsByNumber = (str: string): string => {
  const words = str.split(" ");
  const sortedWords = words.sort(
    (a, b) => extractnumbers(a) - extractnumbers(b),
  );
  const sortedStr = sortedWords.join(" ");

  return sortedStr;
};

// TESTING AREA

const testInputOne = "is2 Thi1s T4est 3a"; //  "Thi1s is2 3a T4est"
const testInputTwo = "4of Fo1r pe6ople g3ood th5e the2"; // "Fo1r the2 g3ood 4of th5e pe6ople"
const testInputThree = ""; //""

console.log(sortWordsByNumber(testInputOne));
console.log(sortWordsByNumber(testInputTwo));
console.log(sortWordsByNumber(testInputThree));
