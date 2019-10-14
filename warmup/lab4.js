const utils = require("./utils");

/**
 * Task 1
 *
 * Kirjutage funktsioon, mis tagastab 2 sekundi pärast "hello"
 *
 * Tip. Peate kasutama Promise ja setTimeout
 */
// console.log("Task 1");

const delayHello = new Promise((resolve, reject) => {
  setTimeout(() => resolve("hello"), 2000);
});

/* Don't change me! */
try {
  delayHello
    .then(x => {
      utils.test(x, "hello");
    })
    .catch(() => {
      console.log("Fail");
    });
} catch (e) {
  console.log("Fail, function is not implemented");
}

/**
 * Task 2
 * "itemCloned" peab olema "item1" clone,
 *  ainuke erinevus objektide vahel on see, et "itemCloned.name" === "Samsung"
 
 ! sshallow and deep cloneing

 */
console.log("Task 2");

const item1 = {
  name: "IPhone",
  cost: 998,
  features: [123, 125, 12, 3, 14]
};
/*
// Nii ei tohi teha!
const itemCloned = {
  name: "Samsung",
  cost: 998,
  features: [123,125,12,3,14]
}
*/
// stringiks ja uuesti objektiks, variant 1
// const itemCloned = JSON.parse(JSON.stringify(item1));
// itemCloned.name = "Samsung";

//variant 2 (spread syntax)

const itemCloned = {
    ...item1,
    name:"Samsung"
}

utils.test(item1.name, "IPhone");

utils.test(itemCloned.name, "Samsung");

utils.test(itemCloned.cost, 998);
