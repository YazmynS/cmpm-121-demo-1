import "./style.css";

// Define the Item interface
interface Item {
  name: string;
  cost: number;
  rate: number;
}

// Define availableItems array
const availableItems: Item[] = [
  { name: "Rukia", cost: 10, rate: 0.1 },
  { name: "Yoruichi", cost: 100, rate: 2 },
  { name: "Kisuke", cost: 1000, rate: 50 },
  { name: "Zangetsu", cost: 10000, rate: 100 },
];

// Set up the main elements in the app
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Soul Reaper";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create main click image button
const button = document.createElement("img");
button.src = "src/Ichigo.png"; // Ensure the image path is correct
button.style.width = "150px";
button.style.cursor = "pointer";
app.append(button);

// Create counter and growth rate display
let count: number = 0;
let growthRate: number = 0;
const Text = document.createElement("h2");
Text.innerText = `Reiatsu: ${count}`;
app.append(Text);

const growthRateText = document.createElement("h2");
growthRateText.innerText = `The current growth rate: ${growthRate.toFixed(1)} reiatsu/sec`;
app.append(growthRateText);

// DisplayText Function
const DisplayText = () => {
  Text.innerText = `Reiatsu: ${count}`;
};

// DisplayGrowthRate Function
const DisplayGrowthRate = () => {
  growthRateText.innerText = `The current growth rate: ${growthRate.toFixed(1)} reiatsu/sec`;
};

// Increment count on click (on the image)
button.addEventListener("click", () => {
  count++;
  DisplayText();
  updateButtonStates();
});

// Store the click counts and price dynamically for each item
const itemStates = availableItems.map(item => ({
  clicks: 0, // Track how many times each item has been clicked
  price: item.cost, // Set initial price for the item
}));

// Dynamically create buttons for each item in the availableItems array
const itemButtonContainer = document.createElement("div");
app.append(itemButtonContainer);

availableItems.forEach((item, index) => {
  const itemState = itemStates[index]; // Access the current item's state

  // Create button for each item
  const itemButton = document.createElement("button");
  itemButton.innerHTML = `Train with ${item.name}: ${itemState.clicks} (Cost: ${itemState.price})`;
  itemButton.disabled = true; // Initially disabled
  itemButtonContainer.append(itemButton);

  // Handle button click logic for each item
  itemButton.addEventListener("click", () => {
    if (count >= itemState.price) {
      count -= itemState.price; // Subtract the current price
      growthRate += item.rate; // Increment growth rate
      itemState.clicks++; // Increment the click count
      itemState.price = Math.ceil(itemState.price * 1.15); // Increase the price by 1.15
      itemButton.innerHTML = `Train with ${item.name}: ${itemState.clicks} (Cost: ${itemState.price})`; // Update button text
      DisplayText();
      DisplayGrowthRate();
      updateButtonStates(); // Check if buttons should be enabled or disabled
    }
  });
});

// Enable or disable buttons based on the current count
const updateButtonStates = () => {
  availableItems.forEach((item, index) => {
    const itemButton = itemButtonContainer.querySelectorAll("button")[index]; // Access each button dynamically
    const itemState = itemStates[index]; // Access the current item's state
    itemButton.disabled = count < itemState.price;
  });
};

// Increment count based on frame rate and growth rate
let frameTime = 0;
let wholeTime = 0;
const timedGrowth = false;

requestAnimationFrame(function animate(time) {
  if (frameTime === 0) frameTime = time;

  if (timedGrowth) {
    wholeTime += (time - frameTime) / 1000;

    // Increment count with whole numbers only
    while (wholeTime >= 1) {
      count += growthRate;
      wholeTime -= 1;
    }
    DisplayText();
    updateButtonStates(); // Ensure buttons are updated
  }

  frameTime = time;
  requestAnimationFrame(animate);
});
