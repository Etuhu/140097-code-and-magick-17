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
var fragment = document.createDocumentFragment();
var mainWizard = document.querySelector('.setup-wizard');
var mainCoatColor = mainWizard.querySelector('.wizard-coat');
var mainEyesColor = mainWizard.querySelector('.wizard-eyes');
var fireballsColor = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballsColorInput = document.querySelector('input[name="fireball-color"]');

var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');
// var inputUsernameFocus = document.activeElement;

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// userDialog.classList.remove('hidden');

// Открытие/закрытие окна настройки персонажа
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// if (document.querySelector('.setup-user-name') === inputUsernameFocus) {
//   document.removeEventListener('keydown', onPopupEscPress);
// }

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

// Изменение цвета мантии персонажа
mainCoatColor.addEventListener('click', function () {
  mainCoatColor.style.fill = COAT_COLORS[getRandom(1, COAT_COLORS.length)];
  var mainCoatColorValue = mainCoatColor.style.fill;
  coatColorInput.value = mainCoatColorValue;
});

// Изменение цвета глаз персонажа
mainEyesColor.addEventListener('click', function () {
  mainEyesColor.style.fill = EYES_COLORS[getRandom(1, EYES_COLORS.length)];
  var mainEyesColorValue = mainEyesColor.style.fill;
  eyesColorInput.value = mainEyesColorValue;
});

// Изменение цвета файерболлов
fireballsColor.addEventListener('click', function () {
  fireballsColor.style.background = FIREBALLS_COLORS[getRandom(1, FIREBALLS_COLORS.length)];
  var fireballsColorValue = fireballsColor.style.background;
  fireballsColorInput.value = fireballsColorValue;
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
