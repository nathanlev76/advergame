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
let secondCardDesc
let choixspe;
let blgodmode = false;
var cardFlip = new Audio('./audio/flip.mp3');
var cardUnflip = new Audio('./audio/unflip.mp3');
var backgroundmusic = new Audio('./audio/background-music.mp3');
let comboCard = 0;
let findText = document.getElementById("find");




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
    if(comboCard == 0 || comboCard == 1){
      moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br>Combo: <span>${comboCard}</span>`;
    }
    else if(comboCard == 2){
      moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br>Combo: <span id="combo1">${comboCard}</span>`;
    }
    else if(comboCard == 3){
      moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br>Combo: <span id="combo2">${comboCard}</span>`;
    }
    else if(comboCard == 4){
      moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br>Combo: <span id="combo3">${comboCard}</span>`;
    }
    else if(comboCard == 5){
      moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br>Combo: <span id="combo4">${comboCard}</span>`;
    }
    else if(comboCard >= 6){
      moves.innerHTML = `<span>Mouvements:</span> ${movesCount}</br>Combo: <span id="combo5">${comboCard}</span>`;
    }


  };

  //objects aleatoires

  const generateRandom = (choixspe, size = 4) => {
    if (choixspe == "Dev"){
      var items = [
        {name:"php", image:"./images/dev/php.png", desc:"PHP"},
        {name:"python", image:"./images/dev/python.png", desc: "Python"},
        {name:"react", image:"./images/dev/reactjs.png", desc: "ReactJS"},
        {name:"mysql", image:"./images/dev/mysql.png", desc: "MySQL"},
        {name:"java", image:"./images/dev/java.png", desc: "Java"},
        {name:"cplusplus", image:"./images/dev/cplusplus.png", desc: "C++"},
        {name:"csharp", image:"./images/dev/csharp.png", desc: "C#"},
        {name:"html", image:"./images/dev/html.png", desc: "HTML 5"},
    ];
  }
    else if (choixspe == "Cg"){
      var items = [
        {name:"ae", image:"./images/cg/Ae.png", desc: "Adobe After Effect"},
        {name:"figma", image:"./images/cg/Figma.png", desc: "Figma"},
        {name:"id", image:"./images/cg/id.png", desc: "Adobe InDesign"},
        {name:"illustrator", image:"./images/cg/illustrator.png", desc: "Adobe Illustrator"},
        {name:"lightroom", image:"./images/cg/Lightroom.png", desc: "Adobe Lightroom"},
        {name:"photoshop", image:"./images/cg/photoshop.png", desc: "Adobe Photoshop"},
        {name:"premiere", image:"./images/cg/premiere.png", desc: "Adobe Premiere Pro"},
        {name:"xd", image:"./images/cg/Xd.png", desc: "Adobe Experience Design"},
      ];
  }
  else if (choixspe == "Eb"){
    var items = [
      {name:"adsens", image:"./images/eb/adsens.png", desc: "Google AdSense"},
      {name:"analytics", image:"./images/eb/analytics.png", desc: "Google Analytics"},
      {name:"frog", image:"./images/eb/frog.png", desc: "Screaming Frog"},
      {name:"hubspot", image:"./images/eb/hubspot.png", desc: "HubSpot"},
      {name:"mailchimp", image:"./images/eb/mailchimp.png", desc: "MailChimp"},
      {name:"semrush", image:"./images/eb/semrush.png", desc: "Semrush"},
      {name:"sheet", image:"./images/eb/sheet.png", desc: "Sheet"},
      {name:"wordpress", image:"./images/eb/wordpress.png", desc: "WordPress"},
    ];
}
else if (choixspe == "Smm"){
  var items = [
    {name:"facebook", image:"./images/smm/facebook.png", desc: "Facebook"},
    {name:"unnamed", image:"./images/smm/unnamed.png", desc: "Gmail"},
    {name:"instagram", image:"./images/smm/instagram.png", desc: "Instagram"},
    {name:"linkedin", image:"./images/smm/linkedin.png", desc: "Linkedin"},
    {name:"pinterest", image:"./images/smm/pinterest.png", desc: "Pinterest"},
    {name:"raw", image:"./images/smm/raw.png", desc: "Twitter"},
    {name:"tiktok", image:"./images/smm/tiktok.png", desc: "Tiktok"},
    {name:"youtube", image:"./images/smm/youtube.png", desc: "Youtube"},
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
    if(blgodmode){
      jeuxContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].name}" card-id="${i}" card-desc="${cardValues[i].desc}">
              <div class="card-before"><img src="${cardValues[i].image}" height="114" width="114" class="image"/></div>
              <div class="card-after">
              <img src="${cardValues[i].image}" class="image" height="114" width="114"/></div></div>
          `;
      } 
    else {
      jeuxContainer.innerHTML += 
      `<div class="card-container" data-card-value="${cardValues[i].name}" card-id="${i}" card-desc="${cardValues[i].desc}">
       <div class="card-before"><img src="./images/${choixspe.toLowerCase()}_logo.png" height="114" width="114" class="image"/></div>
       <div class="card-after"><img src="${cardValues[i].image}" class="image" height="114" width="114"/></div></div>`;
        }
  }  



  //Grid

  jeuxContainer.style.gridTemplateColumns = `repeat(${size},auto)`;


  //Cartes

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if(!card.classList.contains("flipped")){
        cardFlip.pause();
        cardFlip.currentTime = 0;
        cardFlip.volume = 0.2;
        cardFlip.play();
      }

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
          secondCardDesc = card.getAttribute("card-desc");
          if (firstCardValue == secondCardValue && firstCardId != secondCardId) {
            findText.innerHTML = "Vous avez trouvé: " + "<span id='findcolor'>" + secondCardDesc + "</span>"
            comboCard++;
            if (comboCard == 2){
              var combo2 = new Audio('./audio/add/V1.ogg');
              combo2.play();  
            }
            else if (comboCard == 3){
              var combo3 = new Audio('./audio/add/V2.ogg');
              combo3.play();  
            }
            else if (comboCard == 4){
              var combo4 = new Audio('./audio/add/V3.ogg');
              combo4.play();  
            }
            else if (comboCard == 5){
              var combo5 = new Audio('./audio/add/V4.ogg');
              combo5.play();  
            }
            else if (comboCard >= 6){
              var combo6 = new Audio('./audio/add/V5.ogg');
              combo6.play();  
            }
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
              backgroundmusic.pause();
              victory.play();
              stopGame();
            }
          } else {
            //si les carte de match pas retour a la normal
            if (firstCardId != secondCardId){
              comboCard = 0;
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

  //Start timerr
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
  backgroundmusic.volume = 0.3
  backgroundmusic.loop = true;
  backgroundmusic.play();
};

const godmode = () => {
  blgodmode = true;
}
