/**
 * Task 1
 *
 * Sums an array
 */
export const simpleArraySum = xs => {
  
};

/**
 * Task 2
 *
 * Reverses a string
 */
export const reverseString = word => {
  throw new Error("Implement");
};

export const Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

/**
 * Task 3
 *
 * Generates a random item list
 *
 * @method
 * @param {number} n - Number of items generated
 * @return {Array.<{name: string, cost: number, size: "small" | "medium" | "large" }>} items
 */
export const generateRandomItemList = n =>{
  const items = [];
  for(let i=0; i<=n; i++){
    const item = {
      name:"Padi"+generateRandomItemList(0,1000),
      cost:getRandomIntInclusive(0,1000),
      size:Object.values(Size)[getRandomIntInclusive(0,2)]
    };
    items.push(item);
  }
  return items;
};

const items = generateRandomItemList(3);
Console.log(items);

/**
 * Task 4
 */
export const findMostExpensiveItem = items => {
  throw new Error("Implement");
};

/**
 * Task 5
 */
export const findCheapestItem = items => {
  throw new Error("Implement");
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

