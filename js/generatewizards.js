'use strict';

(function () {
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.util.currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.util.currentEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.util.sortingValues(left.name, right.name);
      }
      return rankDiff;
    }));
  };

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
