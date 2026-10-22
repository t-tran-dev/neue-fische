type Ingredient = {
  name: string;
  amountGrams: number;
};

type Recipe = {
  name: string;
  servings: number;
  vegetarian: boolean;
  ingredients: Ingredient[];
};

const hotDog: Recipe = {
  name: "Hot Dog",
  servings: 1,
  vegetarian: false,
  ingredients: [
    { name: "sausage", amountGrams: 100 },
    { name: "Hot Dog Roll", amountGrams: 50 },
    { name: "Ketchup", amountGrams: 10 },
  ],
};

const aglioEOlio: Recipe = {
  name: "Aglio e Olio",
  servings: 2,
  vegetarian: true,
  ingredients: [
    { name: "Pasta", amountGrams: 200 },
    { name: "Garlic", amountGrams: 50 },
    { name: "Olive Oil", amountGrams: 20 },
    { name: "Pecorino", amountGrams: 40 },
    { name: "Salt", amountGrams: 6 },
    { name: "Pepper", amountGrams: 2 },
  ],
};

// A function summarize(recipe: Recipe): string that returns a readable single-line description of the recipe

const summarize = (recipe: Recipe): string => {
  const { name, servings, vegetarian, ingredients } = recipe;

  const ingridientStrArray = ingredients.map(({ name, amountGrams }, index) => {
    const ingridientBaseStr = `${amountGrams}g of ${name}`;
    if (index === ingredients.length - 1) {
      return `and ${ingridientBaseStr}.`;
    }
    return `${ingridientBaseStr},`;
  });

  const ingridientStr = ingridientStrArray.join(" ");

  const summary = `${name}. To make ${servings} serving of this ${vegetarian ? "vegetarian" : "non-vegetarian"} dish, you will need: ${ingridientStr}`;

  return summary;
};

console.log(summarize(hotDog));
console.log(summarize(aglioEOlio));
