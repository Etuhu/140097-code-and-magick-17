'use strict';

(function () {
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var mainWizard = document.querySelector('.setup-wizard');
  var mainCoatColor = mainWizard.querySelector('.wizard-coat');
  var mainEyesColor = mainWizard.querySelector('.wizard-eyes');
  var fireballsColor = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var fireballsColorInput = document.querySelector('input[name="fireball-color"]');

  var currentCoatColor;
  var currentEyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = function (color) {
    currentEyesColor = color;
    updateWizards();
  };

  window.wizard.onCoatChange = function (color) {
    currentCoatColor = color;
    updateWizards();
  };

  // Изменение цвета мантии персонажа
  mainCoatColor.addEventListener('click', function () {
    coatColorInput.value = COAT_COLORS[window.util.getRandom(1, COAT_COLORS.length)];
    var mainCoatColorValue = coatColorInput.value;
    mainCoatColor.style.fill = mainCoatColorValue;
    currentCoatColor = mainCoatColorValue;
    window.generateWizards.updateWizards();
  });

  // Изменение цвета глаз персонажа
  mainEyesColor.addEventListener('click', function () {
    eyesColorInput.value = EYES_COLORS[window.util.getRandom(1, EYES_COLORS.length)];
    var mainEyesColorValue = eyesColorInput.value;
    mainEyesColor.style.fill = mainEyesColorValue;
    currentEyesColor = mainEyesColorValue;
    window.generateWizards.updateWizards();
  });

  // Изменение цвета файерболлов
  fireballsColor.addEventListener('click', function () {
    fireballsColorInput.value = FIREBALLS_COLORS[window.util.getRandom(1, FIREBALLS_COLORS.length)];
    var fireballsColorValue = fireballsColorInput.value;
    fireballsColor.style.backgroundColor = fireballsColorValue;
  });

  var loadHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.generateWizards = {
    errorHandler: errorHandler,
    updateWizards: updateWizards
  };

  window.backend.load(loadHandler, errorHandler);
})();
