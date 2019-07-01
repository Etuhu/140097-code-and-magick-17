'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');
var defaultCoordsUserDialog = {
  x: userDialog.style.left,
  y: userDialog.style.top
};
var fragment = document.createDocumentFragment();
var mainWizard = document.querySelector('.setup-wizard');
var mainCoatColor = mainWizard.querySelector('.wizard-coat');
var mainEyesColor = mainWizard.querySelector('.wizard-eyes');
var fireballsColor = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballsColorInput = document.querySelector('input[name="fireball-color"]');
var usernameInput = document.querySelector('input[name="username"]');

var bagWithArtifacts = document.querySelector('.setup-artifacts');
var starArtifact = document.querySelector('#draggedStar');

var dialogHandle = userDialog.querySelector('.upload');

var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Устанавливает координаты расположения окна настроек персонажа по умолчанию
var setDefaultCoordsUserDialog = function () {
  userDialog.style.left = defaultCoordsUserDialog.x;
  userDialog.style.top = defaultCoordsUserDialog.y;
};

// Открытие/закрытие окна настройки персонажа
// userDialog.classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (usernameInput === document.activeElement) {
    return evt;
  } else {
    if (evt.keyCode === ESC_KEYCODE) {
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
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseButton.addEventListener('click', function () {
  closePopup();
});

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
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

// Изменение цвета мантии персонажа
mainCoatColor.addEventListener('click', function () {
  coatColorInput.value = COAT_COLORS[getRandom(1, COAT_COLORS.length)];
  var mainCoatColorValue = coatColorInput.value;
  mainCoatColor.style.fill = mainCoatColorValue;
});

// Изменение цвета глаз персонажа
mainEyesColor.addEventListener('click', function () {
  eyesColorInput.value = EYES_COLORS[getRandom(1, EYES_COLORS.length)];
  var mainEyesColorValue = eyesColorInput.value;
  mainEyesColor.style.fill = mainEyesColorValue;
});

// Изменение цвета файерболлов
fireballsColor.addEventListener('click', function () {
  fireballsColorInput.value = FIREBALLS_COLORS[getRandom(1, FIREBALLS_COLORS.length)];
  var fireballsColorValue = fireballsColorInput.value;
  fireballsColor.style.backgroundColor = fireballsColorValue;
});

// Генерирование похожих персонажей
document.querySelector('.setup-similar').classList.remove('hidden');

var createWizards = function (count) {
  var wizardsArray = [];

  for (var i = 0; i < count; i++) {
    wizardsArray.push({
      name: WIZARD_NAMES[getRandom(1, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandom(1, WIZARD_SURNAMES.length)],
      coatColor: COAT_COLORS[getRandom(1, COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandom(1, EYES_COLORS.length)]
    });
  }
  return wizardsArray;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var drawingWizards = function () {
  var wizards = createWizards(4);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

drawingWizards();
userDialog.querySelector('.setup-similar').classList.remove('hidden');

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
