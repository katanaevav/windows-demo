'use strict';
var MIN_WINDOW_HEIGHT = 260;
var MIN_WINDOW_WIDTH = 360;
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

      var top = (wnd.offsetTop - shift.y);
      var left = (wnd.offsetLeft - shift.x);

      top = (top < 0) ? 0 : top;
      left = (left < 0) ? 0 : left;
      top = (top > wnd.offsetParent.offsetHeight - wnd.offsetHeight) ? wnd.offsetParent.offsetHeight - wnd.offsetHeight : top;
      left = (left > wnd.offsetParent.offsetWidth - wnd.offsetWidth) ? wnd.offsetParent.offsetWidth - wnd.offsetWidth : left;

      // if((startCoords.x >= wnd.offsetLeft && startCoords.x <= wnd.offsetLeft + wnd.offsetWidth) && (startCoords.y >= wnd.offsetTop + wnd.offsetParent.offsetTop && startCoords.y <= wnd.offsetTop + wnd.offsetHeight + wnd.offsetParent.offsetTop)) {
        wnd.style.top = top + 'px';
        wnd.style.left = left + 'px';
      // }
      
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

var onResizeWindow = function (evt, wnd, resizeItem) {
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

    var height = (wnd.offsetHeight  - shift.y);
    var width = (wnd.offsetWidth - shift.x);

    height = (height < MIN_WINDOW_HEIGHT) ? MIN_WINDOW_HEIGHT : height;
    width = (width < MIN_WINDOW_WIDTH) ? MIN_WINDOW_WIDTH : width;
    height = (height > wnd.offsetParent.offsetHeight - wnd.offsetTop) ? wnd.offsetParent.offsetHeight - wnd.offsetTop : height;
    width = (width > wnd.offsetParent.offsetWidth - wnd.offsetLeft) ? wnd.offsetParent.offsetWidth - wnd.offsetLeft : width;

    // if((startCoords.x >= wnd.offsetLeft && startCoords.x <= wnd.offsetLeft + wnd.offsetWidth) && (startCoords.y >= wnd.offsetTop + wnd.offsetParent.offsetTop && startCoords.y <= wnd.offsetTop + wnd.offsetHeight + wnd.offsetParent.offsetTop)) {
      wnd.style.height = height + 'px';
      wnd.style.width = width + 'px';
    // }
    
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        resizeItem.removeEventListener('click', onClickPreventDefault);
      };

      resizeItem.addEventListener('click', onClickPreventDefault);
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

var setWindowResizeable = function (wnd, resizeItem) {
  resizeItem.addEventListener('mousedown', function (evt) {
    onResizeWindow(evt, wnd, resizeItem);
  });
}

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
  setWindowResizeable(newWindow, newWindow.querySelector('.window-status__resize-element'))
  setWindowClosable(newWindow);
};

newWindowButton.addEventListener('click', onCreaneNewWindow);