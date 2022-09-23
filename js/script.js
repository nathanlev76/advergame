//declaration valeur
const moves = document.getElementById("moves-cuont");
const tempsValue = document.getElementById("temps");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const jeuxContainer = document.querySelector(".jeux-container");
const resultat = document.getElementById("resultat");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// images

 const items = [
	{name:"img1", image:"./images/cover.png"},
	{name:"img2", image:"./images/helmet-1.png"},
	{name:"img3", image:"./images/potion-1.png"},
	{name:"img4", image:"./images/ring-1.png"},
	{name:"img5", image:"./images/scroll-1.png"},
	{name:"img6", image:"./images/shield-1.png"},
	{name:"img7", image:"./images/sword-1.png"},
	{name:"img8", image:"./images/logo192.png"},
];
//const nws ={name:"couve", image:"../images/logo_nws.svg"};

//gestion temps

let seconds = 0, minutes = 0;

//direction et conteur victoire

let movesCount = 0, conteurvictoire = 0;

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
	tempsValue.innerHTML = `<span>Temps:</span>${minutesValue}:${secondsValue}`;

};

//calcul de mouvement

const movesCounter = () => {
	movesCount += 1;
	moves.innerHTML = `<span>Moves:</span>${movesCount}`;

};

//objects aleatoires

const generateRandom = (size = 4) => {

 //temporaire

	let tempArray = [...items];

//carte valeur

	let cardValues = [];

//taile des items 4*4 / 2 tailes et paires

	size = (size * size) / 2;

//selection d'objects

	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * tempArray.length);
		cardValues.push(tempArray[randomIndex]);

//section et suppression d'objects

		tempArray.splice(randomIndex, 1);
}

	return cardValues;
};



const matrixGenerator = (cardValues, size = 4) => {
	jeuxContainer.innerHTML ="";
	cardValues = [...cardValues, ...cardValues];

	//simple swipe

	cardValues.sort(() => Math.random() - 0.5);
	for (let i = 0; i < size * size ; i++) {

 	jeuxContainer.innerHTML += `
<div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"><img src="./images/nws_logo.png" height="100" width="100" class="image"/></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div></div>
     `;
  }

  //Grid

  jeuxContainer.style.gridTemplateColumns = `repeat(${size},auto)`;


  //Cartes

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {

      if (!card.classList.contains("matched")) {

        //flip et changement de carte
        card.classList.add("flipped");

        if (!firstCard) {

            //changement de la carte en carte 1
          firstCard = card;

          //carte actuellle = cart1

          firstCardValue = card.getAttribute("data-card-value");
        } else {

          movesCounter();

          //valeur de la carte 2

          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");


            firstCard = false;
            //si les carte match afficher conteur de victoire
            conteurvictoire += 1;
          
            if (conteurvictoire == Math.floor(cardValues.length / 2)) {
              resultat.innerHTML = `<h2>Victoire</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //si les carte de match pas retour a la normal

            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
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


//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;

  //controls amd buttons visibility

  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");

  //Start timer
  interval = setInterval(timeGenerator, 1000);

  //initial moves

  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//arret du jeu

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);



//demarrage des valeurs et appels des fonction

const initializer = () => {

	resultat.innerText = "";
	conteurvictoire = 0;
	let cardValues = generateRandom();
	console.log(cardValues);
	matrixGenerator(cardValues);
};
