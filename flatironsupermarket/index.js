const items = ["apple", "banana", "pineapple"];

console.log("Welcome to FlatironSupermarket!");

function purchaseItem(itemToPurchase, quantity) {
  if (!items.includes(itemToPurchase)) {
    console.log("Error: Invalid item! Unable to complete purchase!");
    return;
  }
  if (isNaN(quantity)) {
    console.log("Error: Invalid quantity! Unable to complete purchase!");
    return;
  }
  let totalCost;
  if (itemToPurchase === "apple") {
    totalCost = 1.99 * quantity;
  } else if (itemToPurchase === "banana") {
    totalCost = 0.99 * quantity;
  } else if (itemToPurchase === "pineapple") {
    totalCost = 2.99 * quantity;
  }
  console.log(`You purchased $ {quantity} ${itemToPurchase}(s) for $${totalCost.toFixed(2)}`);
}

function addItem(newItem) {
  items.push(newItem);
  console.log(`${newItem} has been added to the store!`);
  console.log("Updated items:", items);
}

purchaseItem("apple", 3);
purchaseItem("banana", 5);
purchaseItem("pineapple", 2);
purchaseItem("mango", 1);
purchaseItem("apple", "lots");
addItem("mango");
