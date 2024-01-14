// Define the prependBase function
function prependBase() {
  const currentSlide = document.querySelector('.reveal .slides > section.present');

  // Select all 'motion-canvas-player' elements in the current slide
  if (currentSlide) {

    // this code assumes one animation per slide
    // TODO: make it work with multiple animations per slide
    const player = currentSlide.querySelector('motion-canvas-player')

    if (player.getAttribute('loop') === 'false' ) {
      setTimeout(() => {
        console.log("Trying to toggle loop")
          player.player.toggleLoop();
        }, 1000); // Adjust the delay as needed
      }
    }
}

// Check every 100ms if Reveal is defined
var checkReveal = setInterval(function() {
  if (window.Reveal) {
    // If Reveal is defined, set up the event listener and clear the interval
    Reveal.addEventListener('slidechanged', prependBase);
    clearInterval(checkReveal);
  }
}, 1000);