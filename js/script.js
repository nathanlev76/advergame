//declaration valeur
const direction = document.getElementById("direction");
const tempsValue = document.getElementById("temps");
const commencerButton = document.getElementById("commencer");
const stopButton = document.getElementById("stop");
const jeu = document.querySelector("jeux");
const resultat = document.getElementById("resultat");
const controleur = document.querySelector("controleur");
let carte;
let interval;
let carteune = false;
let cartedeux = false;

// images

 const items = [
	{name:"img1", image:"../images/cover.png"},
	{name:"img2", image:"../images/helmet-1.png"},
	{name:"img3", image:"../images/potion-1.png"},
	{name:"img4", image:"../images/ring-1.png"},
	{name:"img5", image:"../images/scroll-1.png"},
	{name:"img6", image:"../images/shield-1.png"},
	{name:"img7", image:"../images/sword-1.png"},
	{name:"img8", image:"../images/logo192.png"},
];

//gestion temps

let seconds = 0, minutes = 0;

//direction et conteur victoire

let contDirection = 0, conteurvictoire = 0;

//temps

const timeGenerator = () => {
	seconds += 1;

		//minutes logiques

	if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
	}

		//timeur de l'ecran

	let secondsValue = seconds < 10 ? `0${secondes}` : seconds;
	let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
	tempsValue.innerHTML = `<span>Time:</span>$ {minutesValue}:${secondsValue}`;

};

//calcul de mouvement

const contDirections = () => {
	contDirection += 1;
	direction.innerHTML = `<span>direction:</span>${contDirection}`;

};

//objects aleatoires

const generateRandom = (size = 4) => {

 //temporaire

	let tempArray = [...items];

//carte valeur

	let carteValue = [];

//taile des items 4*4 / 2 tailes et paires

	size = (size * size) / 2;

//selection d'objects

	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * tempArray.length);
		carteValue.push(tempArray[randomIndex]);

//section et suppression d'objects

		tempArray.splice(randomIndex, 1);
}

	return carteValue
};

const matrixGenerator = (carteValue, size = 4) => {
	jeu.innerHTML = "";
	carteValue = [...carteValue, ...carteValue];

	//simple swipe

	carteValue.sort(() => Math.random() - 0.5);
	for (let i = 0; i < size * size; i++) {

		jeu.innerHTML += `
<div class="carte-conteneur" data-carte-value="${carteValue[i].name}">
	<div class="carte-before">nws</div>
	<div class="carte-after">
	<img src="${carteValue[i].image}"
	class="image"/></div>
</div>
	`;
}
	//grid
		jeu.style.gridTemplateColumns= `repeat($
		{size},auto)`;

};
/*
const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}*/


//demarrage des valeurs et appels des fonction

const initializer = () => {
	resultat.innerText = "";
	conteurvictoire = 0;
	let carteValue = generateRandom();
	console.log(carteValue);
	matrixGenerator(carteValue);
};

initializer() ;