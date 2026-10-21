const showLikers = (likers: string[]): string => {
  const likesThis = "likes this";
  const likersCount = likers.length;
  if (likersCount <= 0) return `no one ${likesThis}`;

  switch (likersCount) {
    case 1:
      return `${likers[0]} ${likesThis}`;
    case 2:
      return `${likers[0]} and ${likers[1]} ${likesThis}`;
    case 3:
      return `${likers[0]}, ${likers[1]} and ${likers[2]} ${likesThis}`;
    default:
      return `${likers[0]}, ${likers[1]} and ${likersCount - 2} others ${likesThis}`;
  }
};

// TESTING AREA

const testInputOne: string[] = []; //  "no one likes this"
const testInputTwo = ["Peter"]; //  "Peter likes this"
const testInputThree = ["Jacob", "Alex"]; //  "Jacob and Alex like this"
const testInputFour = ["Max", "John", "Mark"]; //  "Max, John and Mark like this"
const testInputFive = ["Alex", "Jacob", "Mark", "Max"]; //  "Alex, Jacob and 2 others like this
const testInputSix = ["Alex", "Jacob", "Mark", "Max", "Phillip"]; //  "Alex, Jacob and 3 others like this

console.log(showLikers(testInputOne));
console.log(showLikers(testInputTwo));
console.log(showLikers(testInputThree));
console.log(showLikers(testInputFour));
console.log(showLikers(testInputFive));
console.log(showLikers(testInputSix));
