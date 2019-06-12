'use strict';

// var names = ['Вы', 'Илья', 'Иван', 'Фёдор'];
// var times = [1100, 2300, 1500, 1800];
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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    // ctx.fillText(Math.round(times[i]), CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
    // ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, barWidth, BAR_HEIGHT);

    ctx.fillText(Math.round(times[i]), LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * i, topGap - TEXT_HEIGHT * 1.5);
    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    ctx.fillRect(LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * i, topGap, BAR_WIDTH, (barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * i, topGap + barHeight + TEXT_HEIGHT / 1.5);
  }

  // ctx.fillText(Math.round(times[0]), LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 0, topGap - TEXT_HEIGHT * 1.5);
  // ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  // ctx.fillRect(LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 0, topGap, BAR_WIDTH, barHeight);
  // ctx.fillStyle = '#000000';
  // ctx.fillText(names[0], LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 0, topGap + barHeight + TEXT_HEIGHT / 1.5);
  //
  // ctx.fillText(Math.round(times[1]), LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 1, topGap - TEXT_HEIGHT * 1.5);
  // ctx.fillStyle = 'rgba(0, 0, 255, 1)';
  // ctx.fillRect(LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 1, topGap, BAR_WIDTH, barHeight);
  // ctx.fillStyle = '#000000';
  // ctx.fillText(names[1], LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 1, topGap + barHeight + TEXT_HEIGHT / 1.5);
  //
  // ctx.fillText(Math.round(times[2]), LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 2, topGap - TEXT_HEIGHT * 1.5);
  // ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
  // ctx.fillRect(LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 2, topGap, BAR_WIDTH, barHeight);
  // ctx.fillStyle = '#000000';
  // ctx.fillText(names[2], LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 2, topGap + barHeight + TEXT_HEIGHT / 1.5);
  //
  // ctx.fillText(Math.round(times[3]), LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 3, topGap - TEXT_HEIGHT * 1.5);
  // ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
  // ctx.fillRect(LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 3, topGap, BAR_WIDTH, barHeight);
  // ctx.fillStyle = '#000000';
  // ctx.fillText(names[3], LEFT_GAP + (BAR_WIDTH + DISTANCE_BETWEEN) * 3, topGap + barHeight + TEXT_HEIGHT / 1.5);
};

// if (names[0] = 'Вы') {
//   ctx.fillStyle = 'rgba(255, 0, 0, 1)';
// } else {
//   ctx.fillStyle = 'rgba(0, 0, 255, 1)'
// }
