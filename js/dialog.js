'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NameLengthRange = {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 25
  };

  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupForm = setupWindow.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');
  var dialogHandle = setupWindow.querySelector('.upload');


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

    if (valueLength < NameLengthRange.MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (NameLengthRange.MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > NameLengthRange.MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - NameLengthRange.MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var changeColor = function (colorArray, inputField, windowElement, styleElement) {
    setupForm.elements[inputField].value = window.setup.getRandomElement(colorArray);
    windowElement.style[styleElement] = setupForm.elements[inputField].value;
  };

  var onSetupPlayerClick = function (evt) {
    switch (evt.target.classList.value) {
      case 'wizard-coat':
        changeColor(window.setup.COAT_COLORS, 'coat-color', evt.target, 'fill');
        break;
      case 'wizard-eyes':
        changeColor(window.setup.EYES_COLORS, 'eyes-color', evt.target, 'fill');
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

  var onPopupSubmit = function (evt) {
    window.backend.save(new FormData(setupForm), function () {
      setupWindow.classList.add('hidden');
    }, window.setup.onError);
    evt.preventDefault();
  };

  var setSetupPosition = function () {
    setupWindow.removeAttribute('style');
  };

  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    setSetupPosition();
    window.setup.showSimilarWizards();

    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('keydown', onPopupEnterPress);
    setupClose.addEventListener('click', onPopupCloseClick);
    setupForm.addEventListener('click', onSetupPlayerClick);
    setupForm.addEventListener('submit', onPopupSubmit);
    userNameInput.addEventListener('invalid', onInvalidNameInput);
    userNameInput.addEventListener('input', onNameInput);
    dialogHandle.addEventListener('mousedown', window.move.onHandleMousedown);
  };

  var closePopup = function () {
    setupWindow.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onPopupEnterPress);
    setupClose.removeEventListener('click', onPopupCloseClick);
    setupForm.removeEventListener('click', onSetupPlayerClick);
    setupForm.removeEventListener('submit', onPopupSubmit);
    userNameInput.removeEventListener('invalid', onInvalidNameInput);
    userNameInput.removeEventListener('input', onNameInput);
    dialogHandle.removeEventListener('mousedown', window.move.onHandleMousedown);

    var node = document.querySelector('.error-message');
    if (node) {
      node.remove();
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

})();
