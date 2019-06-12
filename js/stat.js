'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var LEFT_GAP = 140;
var DISTANCE_BETWEEN = 50;
var TEXT_HEIGHT = 15;
var BAR_WIDTH = 40;
var MAX_HEIGHT = 180;
var BAR_WIDTH_SUM = BAR_WIDTH + DISTANCE_BETWEEN;
var barHeight = MAX_HEIGHT - TEXT_HEIGHT * 2;
// стандартная (максимальная) высота столбца равняется 150
var topGap = CLOUD_HEIGHT - barHeight - TEXT_HEIGHT * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.round(times[i]), LEFT_GAP + BAR_WIDTH_SUM * i, topGap - TEXT_HEIGHT * 3 + MAX_HEIGHT - (barHeight * times[i]) / maxTime);
    var getRandomSaturation = function () {
      return Math.random();
    };
    var randomSaturation = 'rgba(0, 0, 255, ' + getRandomSaturation() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = randomSaturation;
    }
    ctx.fillRect(LEFT_GAP + BAR_WIDTH_SUM * i, topGap + MAX_HEIGHT - TEXT_HEIGHT * 2 - (barHeight * times[i]) / maxTime, BAR_WIDTH, (barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], LEFT_GAP + BAR_WIDTH_SUM * i, topGap + barHeight + TEXT_HEIGHT / 1.5);
  }
};
