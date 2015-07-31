;(function() {
  var getJSON = function(url, callback) {
    if(localStorage['localItems'] === undefined ) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
    console.log('request');
    }
    else {
      callback(localStorage['localItems'])
      console.log('storage');
    };
  };

  var handleResponse = function(event) {
    var paletteGroups;
    if (event === localStorage['localItems']) {
      paletteGroups = JSON.parse(event);
    }
    else {
      localStorage['localItems'] = event.target.responseText;
      paletteGroups = JSON.parse(localStorage['localItems']);
    }

  var header = document.createElement('header');
  var headerText = document.createElement('h1');
  headerText.innerText = 'HexMex';
  header.appendChild(headerText);
  document.body.insertBefore(header, document.body.childNodes[0]);

  paletteGroups.forEach(function(paletteGroup) {
    var colors = paletteGroup.colours,
        id,
        colorVal,
        el,
        color,
        hex;
    var palette = document.createElement('div');
    palette.className = 'palette';
    palette.setAttribute('data-id', paletteGroup.id)
    palette.setAttribute('data-js', paletteGroup.category);

    var titleLink = document.createElement('a')
    titleLink.setAttribute('href', 'palettes/' + paletteGroup.id);
    var title = document.createElement('h3');
    titleLink.appendChild(title);
    palette.appendChild(titleLink);
    title.innerHTML = paletteGroup.title;
    var url = 'palettes/' + paletteGroup.id;

    titleLink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState(null, null, url);


    });

    var keyword = document.createElement('p');
    keyword.innerHTML = paletteGroup.category;
    palette.appendChild(keyword);

    for (color in colors) {
      colorVal = colors[color];
      el = document.createElement('div');
      el.className = 'color';
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
