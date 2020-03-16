'use strict';

var windowContainer = document.querySelector('.windows');

var onWindowClick = function (evt) {
  var windowsList = windowContainer.querySelectorAll('.window');
  windowsList.forEach(function (item) {
    item.style.zIndex = 0;
    if (item.contains(evt.target)) {
      item.style.zIndex = 1;
    }
  });
}

windowContainer.addEventListener('mousedown', onWindowClick);
