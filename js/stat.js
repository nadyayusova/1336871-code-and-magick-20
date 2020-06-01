var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_OFFSET = 10;
var GAP = 50;
var BAR_WIDTH = 40;
var SMALL_OFFSET = 10;
var NAME_OFFSET_Y = 20;
var NAME_Y = CLOUD_Y + CLOUD_HEIGHT - NAME_OFFSET_Y;
var NAME_FONT_HEIGHT = 16;
var BAR_OFFSET_Y = NAME_OFFSET_Y + NAME_FONT_HEIGHT + SMALL_OFFSET / 2;
var BAR_Y = CLOUD_Y + CLOUD_HEIGHT - BAR_OFFSET_Y;
var MAX_BAR_HEIGHT = -150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = NAME_FONT_HEIGHT.toString() + 'px PT Mono';
  var congratsPositionY = CLOUD_Y + NAME_FONT_HEIGHT + SMALL_OFFSET;
  ctx.fillText('Ура вы победили!', CLOUD_X + SMALL_OFFSET * 3, congratsPositionY);
  ctx.fillText('Список результатов:', CLOUD_X + SMALL_OFFSET * 3, congratsPositionY + NAME_FONT_HEIGHT + SMALL_OFFSET / 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, NAME_Y);

    var realBarHeight = Math.round((MAX_BAR_HEIGHT * times[i]) / maxTime);
    var captionPositionY = BAR_Y + realBarHeight - SMALL_OFFSET;
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, captionPositionY);

    if (players[i].localeCompare('Вы') === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.random() * 100;
      ctx.fillStyle = 'hsl(240, ' + saturation.toString() + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, realBarHeight);
  }
};
