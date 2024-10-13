import "./style.css";

// Create Item interface
interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Rukia", description: "Ichigo does a training session with Rukia", cost: 10, rate: 0.1 },
  { name: "Yoruichi", description: "Ichigo does a training session with Yoruichi", cost: 100, rate: 2 },
  { name: "Kisuke", description: "Ichigo does a training session with Kisuke",cost: 1000, rate: 50 },
  { name: "Zangetsu", description: "Ichigo does a training session with Zangetsu", cost: 10000, rate: 100 },
  {name: "White", description: "Ichigo does a training session with White", cost: 1000000, rate: 1000},
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
button.src = "src/Ichigo.png";
button.style.width = "150px";
button.style.cursor = "pointer";
app.append(button);

// Create counter display
let count: number = 0;
let growthRate: number = 0;
const Text = document.createElement("h2");
Text.innerText = `Reiatsu: ${count}`;
app.append(Text);

const DisplayText = () => {
  Text.innerText = `Reiatsu: ${count}`;
};

//Create grwoth rate display
const growthRateText = document.createElement("h2");
growthRateText.innerText = `The current growth rate: ${growthRate.toFixed(1)} reiatsu/sec`;
app.append(growthRateText);

const DisplayGrowthRate = () => {
  growthRateText.innerText = `The current growth rate: ${growthRate.toFixed(1)} reiatsu/sec`;
};

// Click and increment count
button.addEventListener("click", () => {
  count++;
  DisplayText();
  updateButtonStates();
});

// Track clicks and price for display
const itemStates = availableItems.map(item => ({
  clicks: 0, 
  price: item.cost,
}));

// Create buttons for each item
const itemButtonContainer = document.createElement("div");
app.append(itemButtonContainer);

availableItems.forEach((item, index) => {
  const itemState = itemStates[index]; // Access the current item's state

  // Create button for each item
  const itemButton = document.createElement("button");
  itemButton.innerHTML = `${item.description} - Train with ${item.name}: ${itemState.clicks} (Cost: ${itemState.price})`;
  itemButton.disabled = true; // Initially disabled
  itemButtonContainer.append(itemButton);

  // Logic for clicking the button
  itemButton.addEventListener("click", () => {
    if (count >= itemState.price) {
      count -= itemState.price; // Subtract price from Reiatsu
      growthRate += item.rate; // Increment growth rate
      itemState.clicks++; // Increment the click count
      itemState.price = itemState.price * 1.15; // Increase the price by 1.15
      itemButton.innerHTML = `${item.description} - Train with ${item.name}: ${itemState.clicks} (Cost: ${itemState.price})`; // Update button text
      DisplayText(); // Update the Reiatsu display
      DisplayGrowthRate(); // Update the growth rate display
      updateButtonStates(); // Update button states based on current Reiatsu count
    }
  });
});

// Enable/disable buttons based on count
const updateButtonStates = () => {
  availableItems.forEach((_, index) => {
    const itemButton = itemButtonContainer.querySelectorAll("button")[index]; // Access each button
    const itemState = itemStates[index]; // Access current item's state
    itemButton.disabled = count < itemState.price;
  });
};

// Increment count based on frame and growth rate
let frameTime = 0;
let wholeTime = 0;
const timedGrowth = true;

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
    updateButtonStates(); 
  }

  frameTime = time;
  requestAnimationFrame(animate);
});
