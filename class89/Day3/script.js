const textArray = [
	"A quick brown fox jumps over a brown dog",
	"She sells seashells over the sea shore",
	"Alpha Omega Beta Theta",
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"He came for me and I came for him",
	"Skibidi toilet rizz",
	"tung tung tung tung tung tung tung tung tung tung tung tung tung tung tung tung Sahur"
]

function getRandomText() {
	const randomIndex = Math.floor(Math.random() * textArray.length)
	return textArray[randomIndex]
}

const button = document.getElementById("pressedBtn");
const text = document.getElementById("display");

function showRandomText(){

	const randomIndex = Math.floor(Math.random() * textArray.length)
	text.textContent = textArray[randomIndex];
}

button.addEventListener('click', showRandomText )