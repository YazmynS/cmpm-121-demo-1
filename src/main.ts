import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create button
const button = document.createElement("button");
button.innerHTML = "Click🔥";
app.append(button);

// Create counter
let count: number = 0;
const Text = document.createElement("h2");
Text.innerText = `Count: ${count}`;
app.append(Text);

//DisplayText Function
const DisplayText = () => {
  Text.innerText = `Count: ${count}`;
};

// Increment count on click
button.addEventListener("click", () => {
  count++;
  DisplayText();
});

//Increment count per frame rate
let frameTime = 0;
let wholeTime = 0;  //Increment count via whole nums

requestAnimationFrame(function animate(time){
  //Handle Base case
  if (frameTime === 0) frameTime = time;
  
  //Calculate Time (!)
  wholeTime += (time - frameTime) / 1000;
  
  //Increment count with whole numbers only
  while (wholeTime >= 1){ 
    count++; 
    wholeTime -= 1;
  }
  //Update values
  frameTime = time;
  DisplayText();
  requestAnimationFrame(animate);
})