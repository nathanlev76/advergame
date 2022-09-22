//declaration valeur
const direction = document.getElementById("direction");
const tempsValue = document.getElementById("temps");
const commencerButton = document.getElementById("commencer");
const stopButton = document.getElementById("stop");
const jeu = document.querySelector(".jeux");
const resultat = document.getElementById("resultat");
const controleur = document.querySelector(".controleur");
let cartes;
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
const nws ={name:"couve", image:"../images/logo_nws.svg"};

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

	let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
	let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
	tempsValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;

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

	size = (size*size) / 2;

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

	for (let i = 0; i <size*size; i++) {
 	jeu.innerHTML += `
     <div class="card-container" data-carte-value="${carteValue[i].name}">
        <div class="card-before">nws</div>
        <div class="card-after">
        <img src="${carteValue[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  jeu.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cartes
  cartes = document.querySelectorAll(".carte-conteneur");
  cartes.forEach((carte) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!carte.classList.contains("matched")) {
        //flip the cliked card
        carte.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!carteune) {
          //so current card will become firstCard
          carteune = carte;
          //current cards value becomes firstCardValue
          carteuneValue = carte.getAttribute("data-carte-value");
        } else {
          //increment moves since user selected second card
          contDirection();
          //secondCard and value
          cartedeux = carte;
          let cartedeuxValue = carte.getAttribute("data-carte-value");
          if (carteuneValue == cartedeuxValue) {
            //if both cards match add matched class so these cards would beignored next time
            carteune.classList.add("matched");
            cartedeux.classList.add("matched");
            //set firstCard to false since next card would be first now
            carteune = false;
            //winCount increment as user found a correct match
            conteurvictoire += 1;
            //check if winCount ==half of cardValues
            if (conteurvictoire == Math.floor(carteValue.length / 2)) {
              resultat.innerHTML = `<h2>Victoire</h2>
            <h4>direction: ${contDirection}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [carteune, cartedeux];
            carteune = false;
            cartedeux = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};





//demarrage des valeurs et appels des fonction

const initializer = () => {
	resultat.innerText = "";
	conteurvictoire = 0;
	let carteValue = generateRandom();
	console.log(carteValue);
	matrixGenerator(carteValue);
};

initializer() ;