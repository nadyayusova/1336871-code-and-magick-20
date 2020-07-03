'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarWizardContent = similarWizardTemplate.content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');


  var getRandomInteger = function (num) {
    return Math.floor(Math.random() * num);
  };

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,

    getRandomElement: function (arr) {
      var randomIndex = getRandomInteger(arr.length);

      return arr[randomIndex];
    }
  };

  var generateWizards = function () {
    var wizards = [];

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      wizards.push({
        name: window.setup.getRandomElement(FIRST_NAMES) + ' ' +
              window.setup.getRandomElement(SECOND_NAMES),
        coatColor: window.setup.getRandomElement(COAT_COLORS),
        eyesColor: window.setup.getRandomElement(EYES_COLORS)
      });
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardContent.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var createWizardsGroup = function () {
    var fragment = document.createDocumentFragment();
    var wizards = generateWizards();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    return fragment;
  };

  var init = function () {
    similarListElement.appendChild(createWizardsGroup());
  };


  init();

})();
