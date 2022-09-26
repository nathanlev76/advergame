//declaration valeur
const moves = document.getElementById("moves-cuont");
const tempsValue = document.getElementById("temps");
const startDev = document.getElementById("startdev");
const startSmm = document.getElementById("startsmm");
const startEb = document.getElementById("starteb");
const startCg = document.getElementById("startcg");
const stopButton = document.getElementById("stop");
const jeuxContainer = document.querySelector(".jeux-container");
const resultat = document.getElementById("resultat");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let firstCardId;
let secondCardId;
let choixspe;
var cardFlip = new Audio('./audio/flip.mp3');
var cardUnflip = new Audio('./audio/unflip.mp3');
let comboCard = 0;



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
    moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br><span>Combo</span>: ${comboCard}`;

  };

  //objects aleatoires

  const generateRandom = (choixspe, size = 4) => {
    console.log(choixspe)
    if (choixspe == "Dev"){
      var items = [
        {name:"img1", image:"./images/dev/php.png"},
        {name:"img2", image:"./images/dev/python.png"},
        {name:"img3", image:"./images/dev/reactjs.png"},
        {name:"img4", image:"./images/dev/mysql.png"},
        {name:"img5", image:"./images/dev/java.png"},
        {name:"img6", image:"./images/dev/cplusplus.png"},
        {name:"img7", image:"./images/dev/csharp.png"},
        {name:"img8", image:"./images/dev/html.png"},
    ];
  }
    else if (choixspe == "Cg"){
      var items = [
        {name:"img1", image:"./images/cg/Ae.png"},
        {name:"img2", image:"./images/cg/Figma.png"},
        {name:"img3", image:"./images/cg/id.png"},
        {name:"img4", image:"./images/cg/illustrator.png"},
        {name:"img5", image:"./images/cg/Lightroom.png"},
        {name:"img6", image:"./images/cg/photoshop.png"},
        {name:"img7", image:"./images/cg/premiere.png"},
        {name:"img8", image:"./images/cg/Xd.png"},
      ];
  }
  else if (choixspe == "Eb"){
    var items = [
      {name:"img1", image:"./images/cg/Ae.png"},
      {name:"img2", image:"./images/cg/Figma.png"},
      {name:"img3", image:"./images/cg/id.png"},
      {name:"img4", image:"./images/cg/illustrator.png"},
      {name:"img5", image:"./images/cg/Lightroom.png"},
      {name:"img6", image:"./images/cg/photoshop.png"},
      {name:"img7", image:"./images/cg/premiere.png"},
      {name:"img8", image:"./images/cg/Xd.png"},
    ];
}
else if (choixspe == "Smm"){
  var items = [
    {name:"img1", image:"./images/cg/Ae.png"},
    {name:"img2", image:"./images/cg/Figma.png"},
    {name:"img3", image:"./images/cg/id.png"},
    {name:"img4", image:"./images/cg/illustrator.png"},
    {name:"img5", image:"./images/cg/Lightroom.png"},
    {name:"img6", image:"./images/cg/photoshop.png"},
    {name:"img7", image:"./images/cg/premiere.png"},
    {name:"img8", image:"./images/cg/Xd.png"},
  ];
}

  
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



const matrixGenerator = (cardValues, choixspe, size = 4) => {
	jeuxContainer.innerHTML ="";
	cardValues = [...cardValues, ...cardValues];

	//simple swipe

	cardValues.sort(() => Math.random() - 0.5);
	for (let i = 0; i < size * size ; i++) {

 	jeuxContainer.innerHTML += `
<div class="card-container" data-card-value="${cardValues[i].name}" card-id="${i}">
        <div class="card-before"><img src="./images/${choixspe.toLowerCase()}_logo.png" height="114" width="114" class="image"/></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image" height="114" width="114"/></div></div>
     `;
  }

  //Grid

  jeuxContainer.style.gridTemplateColumns = `repeat(${size},auto)`;


  //Cartes

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cardFlip.pause();
      cardFlip.currentTime = 0;
      cardFlip.volume = 0.2;
      cardFlip.play();
      if (!card.classList.contains("matched")) {

        //flip et changement de carte
        card.classList.add("flipped");

        if (!firstCard) {

            //changement de la carte en carte 1
          firstCard = card;

          //carte actuellle = cart1

          firstCardValue = card.getAttribute("data-card-value");
          firstCardId = card.getAttribute("card-id");
        } else {

          //valeur de la carte 2

          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          secondCardId = card.getAttribute("card-id");
          if (firstCardValue == secondCardValue && firstCardId != secondCardId) {
            comboCard++;
            if (comboCard == 2){
              var combo2 = new Audio('./audio/combo2.wav');
              victory.play();  
            }
            console.log(comboCard);
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            movesCounter();


            firstCard = false;
            //si les carte match afficher conteur de victoire
            conteurvictoire += 1;
          
            if (conteurvictoire == Math.floor(cardValues.length / 2)) {
              resultat.innerHTML = `<h2 id="victorytitle">VICTOIRE !</h2>
              <h4>Mouvements: ${movesCount}</h4>`;
              var victory = new Audio('./audio/victory.wav');
              victory.play();
              stopGame();
            }
          } else {
            //si les carte de match pas retour a la normal
            if (firstCardId != secondCardId){
              comboCard = 0;
              console.log(comboCard);
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              movesCounter();
              comboCard = 0;
              firstCard = false;
              secondCard = false;
              let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 900);}
          }
        }
      }
    });
  });
};

startGame = (choixspe) => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startDev.classList.add("hide");
  startEb.classList.add("hide");
  startSmm.classList.add("hide");
  startCg.classList.add("hide");

  //Start timer
  interval = setInterval(timeGenerator, 1000);

  //initial moves

  moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br><span>Combo</span>: ${comboCard}`;
  initializer(choixspe);
}



//Start game
startDev.addEventListener("click", () => {
  choixspe = "Dev";
  startGame(choixspe);
});

startCg.addEventListener("click", () => {
  choixspe = "Cg";
  startGame(choixspe);
});

startEb.addEventListener("click", () => {
  choixspe = "Eb";
  startGame(choixspe);
});

startSmm.addEventListener("click", () => {
  choixspe = "Smm";
  startGame(choixspe);
});

//arret du jeu

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    startDev.classList.remove("hide");
    clearInterval(interval);
  })
);



//demarrage des valeurs et appels des fonction

const initializer = (choixspe) => {

	resultat.innerText = "";
	conteurvictoire = 0;
	let cardValues = generateRandom(choixspe);
	matrixGenerator(cardValues, choixspe);
};
