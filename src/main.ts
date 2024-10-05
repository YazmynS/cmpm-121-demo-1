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
const text = document.createElement("h2");
text.innerText = `Count: ${count}`;
app.append(text);

// Increment count on click
button.addEventListener("click", () => {
    count++;
    text.innerText = `Count: ${count}`;
});