import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Soul Reaper";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create Click button
const button = document.createElement("button");
button.innerHTML = "Train";
app.append(button);

// Create counter
let count: number = 0;
let growthRate: number = 0;
const Text = document.createElement("h2");
Text.innerText = `Count: ${count}`;
app.append(Text);

// Create growth rate display
const growthRateText = document.createElement("h2");
growthRateText.innerText = `The current growth rate: ${growthRate.toFixed(1)} reiatsu/sec`;
app.append(growthRateText);

// DisplayText Function
const DisplayText = () => {
  Text.innerText = `Count: ${count}`;
};

// DisplayGrowthRate Function
const DisplayGrowthRate = () => {
  growthRateText.innerText = `The current growth rate: ${growthRate.toFixed(1)} reiatsu/sec`;
};

// Increment count on click
button.addEventListener("click", () => {
  count++;
  DisplayText();
  updateButtonStates();
});

// Create a click counter for each button and initial prices
const rukiaClicks = 0;
const yoruichiClicks = 0;
const kisukeClicks = 0;
const zangetsuClicks = 0;

const rukiaPrice = 10;
const yoruichiPrice = 100;
const kisukePrice = 1000;
const zangetsuPrice = 10000;

// Create Growth Rate button
const RukiaButton = document.createElement("button");
RukiaButton.innerHTML = `Train with Rukia: ${rukiaClicks} (Cost: ${rukiaPrice})`;
RukiaButton.id = "rukia";
RukiaButton.disabled = true;
app.append(RukiaButton);

// Create Growth Rate button 2
const YoruichiButton = document.createElement("button");
YoruichiButton.innerHTML = `Train with Yoruichi: ${yoruichiClicks} (Cost: ${yoruichiPrice})`;
YoruichiButton.id = "yoruichi";
YoruichiButton.disabled = true;
app.append(YoruichiButton);

// Create Growth Rate button 3
const Kisukebutton = document.createElement("button");
Kisukebutton.innerHTML = `Train with Kisuke: ${kisukeClicks} (Cost: ${kisukePrice})`;
Kisukebutton.id = "kisuke";
Kisukebutton.disabled = true;
app.append(Kisukebutton);

// Create Growth Rate button 4
const Zangetsubutton = document.createElement("button");
Zangetsubutton.innerHTML = `Train with Zangetsu: ${zangetsuClicks} (Cost: ${zangetsuPrice})`;
Zangetsubutton.id = "zangetsu";
Zangetsubutton.disabled = true;
app.append(Zangetsubutton);

// Generic function to handle button click, growth management, and click counting with increasing cost
const handleButtonClick = (
  button: HTMLButtonElement,
  clickCounter: { clicks: number },
  growthIncrement: number,
  price: { value: number },
) => {
  button.addEventListener("click", () => {
    if (count >= price.value) {
      count -= price.value; // Subtract the current price
      growthRate += growthIncrement; // Increment growth rate
      clickCounter.clicks++; // Increment click count
      price.value = Math.ceil(price.value * 1.15); // Increase the price by 1.15
      button.innerHTML = `${button.innerHTML.split(":")[0]}: ${clickCounter.clicks} (Cost: ${price.value})`; // Update button text
      DisplayText();
      DisplayGrowthRate(); // Update growth rate display
      updateButtonStates();
      timedGrowth = true;
    }
  });
};

// Call the generic function for each button with its specific values, click counter, and price
handleButtonClick(RukiaButton, { clicks: rukiaClicks }, 0.1, {
  value: rukiaPrice,
});
handleButtonClick(YoruichiButton, { clicks: yoruichiClicks }, 2.0, {
  value: yoruichiPrice,
});
handleButtonClick(Kisukebutton, { clicks: kisukeClicks }, 50, {
  value: kisukePrice,
});
handleButtonClick(Zangetsubutton, { clicks: zangetsuClicks }, 100, {
  value: zangetsuPrice,
});

// Enable or disable buttons based on the count
const updateButtonStates = () => {
  RukiaButton.disabled = count < rukiaPrice;
  YoruichiButton.disabled = count < yoruichiPrice;
  Kisukebutton.disabled = count < kisukePrice;
  Zangetsubutton.disabled = count < zangetsuPrice;
};

// Increment count per frame rate
let frameTime = 0;
let wholeTime = 0;
let timedGrowth = false;

requestAnimationFrame(function animate(time) {
  // Handle base case
  if (frameTime === 0) frameTime = time;

  // Calculate time
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

  // Update values
  frameTime = time;
  requestAnimationFrame(animate);
});
