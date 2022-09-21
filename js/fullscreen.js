var elem = document.documentElement; 
if (elem.requestFullscreen){
    elem.requestFullscreen();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      document.getElementById("fullscreenbutton").src="images/normalscreen.png";
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      document.getElementById("fullscreenbutton").src="images/fullscreen.png";
    }
  }
