
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image;
image.onload = drawImageActualSize; 


image.src = 'images/fonds.svg';

function drawImageActualSize() {



  ctx.drawImage(this, 150, 0);

}