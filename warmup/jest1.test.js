import { exportAllDeclaration } from "@babel/types";

/**
 * Task 1
 *
 * Sums an array
 */
const simpleArraySum = xs => xs.reduce((acc, x) => acc + x, 0);

describe("Lab1 test: simpleArraySum", () => {
  it("adds up array elements properly", () => {
    expect(simpleArraySum([1, 2, 3])).toEqual(6);
    expect(simpleArraySum([])).toEqual(0);
  });
});
