import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Game";
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
const DisplayText = () =>{
    Text.innerText = `Count: ${count}`;
}

// Increment count on click
button.addEventListener("click", () => {
  count++;
  DisplayText();
});

//Increment count per second
setInterval(() => {
    count++;
    DisplayText();

}, 1000);
