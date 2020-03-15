'use strict';

var dialogs = document.querySelectorAll('.window');

var setWindowMovable = function (window, draggedItem) {
  draggedItem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.style.top = (window.offsetTop - shift.y) + 'px';
      window.style.left = (window.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          draggedItem.removeEventListener('click', onClickPreventDefault);
        };

        draggedItem.addEventListener('click', onClickPreventDefault);
      }
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

dialogs.forEach(function (item) {
  setWindowMovable(item, item.querySelector('.window-header'));
});
