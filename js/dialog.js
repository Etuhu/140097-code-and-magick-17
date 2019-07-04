'use strict';

(function () {
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var defaultCoordsUserDialog = {
    x: window.util.userDialog.style.left,
    y: window.util.userDialog.style.top
  };

  var mainWizard = document.querySelector('.setup-wizard');
  var mainCoatColor = mainWizard.querySelector('.wizard-coat');
  var mainEyesColor = mainWizard.querySelector('.wizard-eyes');
  var fireballsColor = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var fireballsColorInput = document.querySelector('input[name="fireball-color"]');
  var usernameInput = document.querySelector('input[name="username"]');
  var dialogHandle = window.util.userDialog.querySelector('.upload');

  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = window.util.userDialog.querySelector('.setup-close');

  var bagWithArtifacts = document.querySelector('.setup-artifacts');
  var starArtifact = document.querySelector('#draggedStar');

  window.userDialog = window.util.userDialog;

  // Устанавливает координаты расположения окна настроек персонажа по умолчанию
  var setDefaultCoordsUserDialog = function () {
    window.util.userDialog.style.left = defaultCoordsUserDialog.x;
    window.util.userDialog.style.top = defaultCoordsUserDialog.y;
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
    window.util.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setDefaultCoordsUserDialog();
  };

  var closePopup = function () {
    window.util.userDialog.classList.add('hidden');
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

      window.util.userDialog.style.top = (window.util.userDialog.offsetTop - shift.y) + 'px';
      window.util.userDialog.style.left = (window.util.userDialog.offsetLeft - shift.x) + 'px';
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

  // Изменение цвета мантии персонажа
  mainCoatColor.addEventListener('click', function () {
    coatColorInput.value = window.setup.COAT_COLORS[window.util.getRandom(1, window.setup.COAT_COLORS.length)];
    var mainCoatColorValue = coatColorInput.value;
    mainCoatColor.style.fill = mainCoatColorValue;
  });

  // Изменение цвета глаз персонажа
  mainEyesColor.addEventListener('click', function () {
    eyesColorInput.value = window.setup.EYES_COLORS[window.util.getRandom(1, window.setup.EYES_COLORS.length)];
    var mainEyesColorValue = eyesColorInput.value;
    mainEyesColor.style.fill = mainEyesColorValue;
  });

  // Изменение цвета файерболлов
  fireballsColor.addEventListener('click', function () {
    fireballsColorInput.value = FIREBALLS_COLORS[window.util.getRandom(1, FIREBALLS_COLORS.length)];
    var fireballsColorValue = fireballsColorInput.value;
    fireballsColor.style.backgroundColor = fireballsColorValue;
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
