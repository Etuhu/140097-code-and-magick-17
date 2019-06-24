'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');
var fragment = document.createDocumentFragment();

var setup = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setup.querySelector('.setup-close');

var openPopup = function () {
  setup.classList.remove('hidden');
};

var closePopup = function () {
  setup.classList.add('hidden');
};

setupOpenButton.addEventListener('click', openPopup);
setupCloseButton.addEventListener('click', closePopup);

userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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
