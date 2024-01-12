

// Run this function so that the player can be used with relative paths, such as
// a github pages deployment. Since this is a separate build file, vite doesn't
// know how to add the base url to the player's src attribute.
(function prependBase() {

  document.querySelectorAll('motion-canvas-player').forEach(player => {
    let url = player.getAttribute('src');
    const oldUrl = url;
      if (window.location.hostname === "localhost") {
        url = url;
      } else {
        if (url.startsWith('/dist/')) {
          // remove /dist/ from the url
          // note that substring(6) keeps everything after the 6th character
          // url = './' + url.substring(6);
          // console.log('Replacing', oldUrl, ' with ', url);
        }
      }
      // Create a new player
      const newElement = document.createElement('motion-canvas-player');
      // Set the same attributes
      newElement.setAttribute('auto', player.getAttribute('auto') ?? 'true');
      newElement.setAttribute('src', url);
      newElement.setAttribute('style', player.getAttribute('style') ?? '');
      // newElement.setAttribute('width', player.getAttribute('width') ?? '10%');
      // Replace the old player
      player.replaceWith(newElement);
    // }
  });
})();
