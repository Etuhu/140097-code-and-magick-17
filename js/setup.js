'use strict';

(function () {
  // var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  // var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  // var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  //
  // var mainWizard = document.querySelector('.setup-wizard');
  // var mainCoatColor = mainWizard.querySelector('.wizard-coat');
  // var mainEyesColor = mainWizard.querySelector('.wizard-eyes');
  // var fireballsColor = document.querySelector('.setup-fireball-wrap');
  // var coatColorInput = document.querySelector('input[name="coat-color"]');
  // var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  // var fireballsColorInput = document.querySelector('input[name="fireball-color"]');
  // var currentCoatColor;
  // var currentEyesColor;
  //
  // // Изменение цвета мантии персонажа
  // mainCoatColor.addEventListener('click', function () {
  //   coatColorInput.value = COAT_COLORS[window.util.getRandom(1, COAT_COLORS.length)];
  //   var mainCoatColorValue = coatColorInput.value;
  //   mainCoatColor.style.fill = mainCoatColorValue;
  //   currentCoatColor = mainCoatColorValue;
  //   window.generateWizards.updateWizards();
  // });
  //
  // // Изменение цвета глаз персонажа
  // mainEyesColor.addEventListener('click', function () {
  //   eyesColorInput.value = EYES_COLORS[window.util.getRandom(1, EYES_COLORS.length)];
  //   var mainEyesColorValue = eyesColorInput.value;
  //   mainEyesColor.style.fill = mainEyesColorValue;
  //   currentEyesColor = mainEyesColorValue;
  //   window.generateWizards.updateWizards();
  // });
  //
  // // Изменение цвета файерболлов
  // fireballsColor.addEventListener('click', function () {
  //   fireballsColorInput.value = FIREBALLS_COLORS[window.util.getRandom(1, FIREBALLS_COLORS.length)];
  //   var fireballsColorValue = fireballsColorInput.value;
  //   fireballsColor.style.backgroundColor = fireballsColorValue;
  // });

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  return window.wizard = wizard;
})();
