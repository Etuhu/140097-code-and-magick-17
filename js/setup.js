'use strict';

var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var mainWizard = document.querySelector('.setup-wizard');
var mainCoatColor = mainWizard.querySelector('.wizard-coat');
var mainEyesColor = mainWizard.querySelector('.wizard-eyes');
var fireballsColor = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballsColorInput = document.querySelector('input[name="fireball-color"]');

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
