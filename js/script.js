
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image;
image.onload = drawImageActualSize; 


image.src = 'images/logo_nws.svg';

function drawImageActualSize() {

  canvas.width = 1800;
  canvas.height = 500;

  ctx.drawImage(this, 0, 0);

}