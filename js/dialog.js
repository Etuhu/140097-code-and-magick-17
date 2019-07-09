'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var defaultCoordsUserDialog = {
    x: userDialog.style.left,
    y: userDialog.style.top
  };

  var usernameInput = document.querySelector('input[name="username"]');
  var dialogHandle = userDialog.querySelector('.upload');

  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = userDialog.querySelector('.setup-close');

  var bagWithArtifacts = document.querySelector('.setup-artifacts');
  var starArtifact = document.querySelector('#draggedStar');

  var form = userDialog.querySelector('.setup-wizard-form');

  window.userDialog = userDialog;

  // Устанавливает координаты расположения окна настроек персонажа по умолчанию
  var setDefaultCoordsUserDialog = function () {
    userDialog.style.left = defaultCoordsUserDialog.x;
    userDialog.style.top = defaultCoordsUserDialog.y;
  };

  var onPopupEscPress = function (evt) {
    if (usernameInput === document.activeElement) {
      return evt;
    } else {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closePopup();
      }
      return evt;
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setDefaultCoordsUserDialog();
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setDefaultCoordsUserDialog();
  };

  setupOpenButton.addEventListener('click', function () {
    openPopup();
  });

  setupOpenButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupCloseButton.addEventListener('click', function () {
    closePopup();
  });

  setupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  });

  // Добавляет возможность перетаскивания окна настроек персонажа
  dialogHandle.addEventListener('mousedown', function (evt) {
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

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (prvDefEvt) {
          prvDefEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Добавляет закрытие окна настроек после успешной отправки данных персонажа на сервер
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, window.generateWizards.errorHandler);
    evt.preventDefault();
  });

  // Добавление функции перетаскивания предметов из магазина в рюкзак
  var dragStart = function (evt) {
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('Text', evt.target.getAttribute('id'));
    evt.dataTransfer.setDragImage(evt.target, 32, 25);
    return true;
  };

  var dragEnter = function (evt) {
    evt.preventDefault();
    return true;
  };

  var dragOver = function (evt) {
    evt.preventDefault();
  };

  var dragDrop = function (evt) {
    var data = evt.dataTransfer.getData('Text');
    evt.target.appendChild(document.getElementById(data));
    evt.stopPropagation();
    return false;
  };

  starArtifact.addEventListener('dragstart', dragStart);
  bagWithArtifacts.addEventListener('dragenter', dragEnter);
  bagWithArtifacts.addEventListener('dragover', dragOver);
  bagWithArtifacts.addEventListener('drop', dragDrop);
})();
