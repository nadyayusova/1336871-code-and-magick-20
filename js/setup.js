'use strict';

var NUMBER_OF_WIZARDS = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;


var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var similarWizardContent = similarWizardTemplate.content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var setupForm = setupWindow.querySelector('.setup-wizard-form');
var userNameInput = document.querySelector('.setup-user-name');


var getRandomInteger = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomElement = function (arr) {
  var randomIndex = getRandomInteger(arr.length);

  return arr[randomIndex];
};

var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards.push({
      name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
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

var onPopupCloseClick = function () {
  closePopup();
};

var onPopupEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
};

var onInvalidNameInput = function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var onNameInput = function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var changeColor = function (colorArray, inputField, windowElement, styleElement) {
  setupForm.elements[inputField].value = getRandomElement(colorArray);
  windowElement.style[styleElement] = setupForm.elements[inputField].value;
};

var onSetupPlayerClick = function (evt) {
  switch (evt.target.classList.value) {
    case 'wizard-coat':
      changeColor(COAT_COLORS, 'coat-color', evt.target, 'fill');
      break;
    case 'wizard-eyes':
      changeColor(EYES_COLORS, 'eyes-color', evt.target, 'fill');
      break;
    case 'setup-fireball':
      changeColor(FIREBALL_COLORS, 'fireball-color', evt.target, 'backgroundColor');
      break;
  }
};

var onPopupEscPress = function (evt) {
  if ((evt.key === 'Escape') && (evt.target.classList.value !== 'setup-user-name')) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setupWindow.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('keydown', onPopupEnterPress);
  setupClose.addEventListener('click', onPopupCloseClick);
  setupForm.addEventListener('click', onSetupPlayerClick);
  userNameInput.addEventListener('invalid', onInvalidNameInput);
  userNameInput.addEventListener('input', onNameInput);
};

var closePopup = function () {
  setupWindow.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('keydown', onPopupEnterPress);
  setupClose.removeEventListener('click', onPopupCloseClick);
  setupForm.removeEventListener('click', onSetupPlayerClick);
  userNameInput.removeEventListener('invalid', onInvalidNameInput);
  userNameInput.removeEventListener('input', onNameInput);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

var init = function () {
  similarListElement.appendChild(createWizardsGroup());
};


init();
