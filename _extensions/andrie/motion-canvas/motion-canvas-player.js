// stop the animation if the loop attribute is set to false
function stopAnimation() {
  const player = document.querySelector('section.present motion-canvas-player')
  if (player) {
    // this code assumes one animation per slide
    // TODO: make it work with multiple animations per slide
    
    // start the animation
    player.setAttribute('auto', true);

    if (player.getAttribute('loop') === 'false'  ) {
      setTimeout(() => {
        pname = player.player.project.name
        const frameCheckInterval = setInterval(() => {
          f = player.player.frame.value;
          nf = player.player.endFrame;
          if (f === nf) {
            // player.player.togglePlayback();
            player.player.requestSeek(nf);
            player.player.deactivate();
            clearInterval(frameCheckInterval);
          }
        }, 1000 / 60); // Check every frame (assuming 60 FPS)
        
        // Clear the interval when the slide changes
        Reveal.addEventListener('slidechanged', () => {
          clearInterval(frameCheckInterval);
        });

      }, 500); // Adjust the delay as needed
    }
  }
}



// Check every 100ms if Reveal is defined
var checkReveal = setInterval(function() {
  if (window.Reveal) {
    // If Reveal is defined, set up the event listener and clear the interval
    Reveal.addEventListener('ready', stopAnimation);
    Reveal.addEventListener('slidechanged', stopAnimation);
    clearInterval(checkReveal);
  }
}, 100);
