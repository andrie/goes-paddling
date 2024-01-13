// Define the prependBase function
function prependBase() {
  const currentSlide = document.querySelector('.reveal .slides > section.present');

  // Select all 'motion-canvas-player' elements in the current slide
  if (currentSlide) {
    const players = currentSlide.querySelectorAll('motion-canvas-player');

    players.forEach(player => {
      let url = player.getAttribute('src') || 'undefined';
      console.log('Editing player with url ', url);
      // Create a new player
      const newElement = document.createElement('motion-canvas-player');
      // Set the same attributes
      newElement.setAttribute('auto', player.getAttribute('auto') ?? 'true');
      newElement.setAttribute('src', url);
      newElement.setAttribute('style', player.getAttribute('style') ?? '');
      // Replace the old player
      player.replaceWith(newElement);
    });
  }
}

// Check every 100ms if Reveal is defined
var checkReveal = setInterval(function() {
  if (window.Reveal) {
    // If Reveal is defined, set up the event listener and clear the interval
    Reveal.addEventListener('slidechanged', prependBase);
    clearInterval(checkReveal);
  }
}, 500);