'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarWizardContent = similarWizardTemplate.content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var setupWindow = document.querySelector('.setup');
  var similarWizards = setupWindow.querySelector('.setup-similar');


  var getRandomInteger = function (num) {
    return Math.floor(Math.random() * num);
  };

  var getRandomElement = function (arr) {
    var randomIndex = getRandomInteger(arr.length);

    return arr[randomIndex];
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardContent.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var createWizardsGroup = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    return fragment;
  };

  var onLoad = function (wizards) {
    similarListElement.appendChild(createWizardsGroup(wizards));

    similarWizards.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.querySelector('.error-message');

    if (!node) {
      node = document.createElement('div');
      var isNew = true;
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.className = 'error-message';
    }
    node.textContent = errorMessage;

    if (isNew) {
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  var showSimilarWizards = function () {
    if (similarListElement.childNodes.length < NUMBER_OF_WIZARDS) {
      window.backend.load(onLoad, onError);
    }
  };


  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    getRandomElement: getRandomElement,
    showSimilarWizards: showSimilarWizards,
    onError: onError
  };
})();
