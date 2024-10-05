import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create div
const div = document.createElement("div");

// Create button
const button = document.createElement("button");
button.innerHTML = "Click🔥";

// Append the button to the div container
div.append(button);

// Append the div container to the app
app.append(div);