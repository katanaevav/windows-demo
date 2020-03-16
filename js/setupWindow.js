'use strict';

var windowNumber = 0;

var onMoveWindow = function (evt, wnd, draggedItem) {
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

      wnd.style.top = (wnd.offsetTop - shift.y) + 'px';
      wnd.style.left = (wnd.offsetLeft - shift.x) + 'px';
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
  
};

var setWindowClosable = function (wnd) {
  var closeButton = wnd.querySelector('.window-header__button--close-button');

  var closeWindow = function () {
    wnd.remove();
  };

  closeButton.addEventListener('click', closeWindow);
};

var setWindowMovable = function (wnd, draggedItem) {
  draggedItem.addEventListener('mousedown', function (evt) {
    onMoveWindow(evt, wnd, draggedItem);
  });
};

var newWindowButton = document.querySelector('.manage-windows__new-window');

var onCreaneNewWindow = function () {
  windowNumber++;
  var windowTemplate = document.querySelector('#window-template')
      .content
      .querySelector('.window');
  var newWindow = windowTemplate.cloneNode(true);    
  newWindow.querySelector('.window-header__text').textContent = 'Новое окно ' + windowNumber;

  var fragment = document.createDocumentFragment();
  fragment.appendChild(newWindow);
  
  var windowsContainer = document.querySelector('.windows');
  windowsContainer.appendChild(fragment);

  setWindowMovable(newWindow, newWindow.querySelector('.window-header'));
  setWindowClosable(newWindow);
};

newWindowButton.addEventListener('click', onCreaneNewWindow);