;(function() {
  var getJSON = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  };
  var handleResponse = function(event) {

    var header = document.createElement('header');
    var headerText = document.createElement('h1');
    headerText.innerText = 'HexMex';
    header.appendChild(headerText);
    document.body.insertBefore(header, document.body.childNodes[0]);

    var paletteGroups = JSON.parse(event.target.responseText);
    paletteGroups.forEach(function(palatteGroup) {
      var colors = palatteGroup.colours,
          colorVal,
          el,
          color,
          hex;
      var palette = document.createElement('div');
      palette.className = 'palette';
      palette.setAttribute('data-js', palatteGroup.category);

      var title = document.createElement('h3');
      title.innerHTML = palatteGroup.title;
      palette.appendChild(title);

      var keyword = document.createElement('p');
      keyword.innerHTML = palatteGroup.category;
      palette.appendChild(keyword);

      for (color in colors) {
        colorVal = colors[color];
        el = document.createElement('div');
        el.className = color;
        el.style.backgroundColor = colorVal;
        el.style.color = colorVal;
        hex = document.createElement('div');
        hex.className = "hex";
        hex.innerHTML = colorVal;
        el.appendChild(hex);
        palette.appendChild(el);
      }

      document.body.appendChild(palette);
    });

  };

  getJSON('/palettes.json', handleResponse);

}());
