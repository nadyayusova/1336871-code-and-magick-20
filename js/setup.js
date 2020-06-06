'use strict';

var NUMBER_OF_WIZARDS = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];


var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var similarListElement = document.querySelector('.setup-similar-list');
var setupWindow = document.querySelector('.setup');
var similarWindow = document.querySelector('.setup-similar');

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

var generateWizard = function () {
  return {
    name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.content.querySelector('.setup-similar-item').cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createWizardsGroup = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    fragment.appendChild(renderWizard(generateWizard()));
  }

  return fragment;
};

var init = function () {
  similarListElement.appendChild(createWizardsGroup());

  setupWindow.classList.remove('hidden');
  similarWindow.classList.remove('hidden');
};


init();
