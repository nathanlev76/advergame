//declaration valeur
const direction = document.getElementById("direction");
const tempsValue = document.getElementById("temps");
const commencerButton = document.getElementById("commencer");
const stopButton = document.getElementById("stop");
const jeux = document.querySelector("jeux");
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

	let secondsValue = seconds < 10 ? '0${secondes}' : seconds;
	let minutesValue = minutes < 10 ? '0${minutes}' : minutes;
	tempsValue.innerHTML = '<span>Time:</span>$ {minutesValue}:${secondsValue}';

};

//calcul de mouvement

const contDirections = () => {
	contDirection += 1;
	direction.innerHTML = '<span>direction:</span>${contDirection}';

};

//objects aleatoires
const generateRandom = (size = 4) => {
 //temporaire
		let tempArray = [...items];
//carte valeur
		let carteValue = [];
//



}