import { keydownEscHandler } from './upload-form.js';

const showDataErrorMessage = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.querySelector('.data-error').cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, 5000);
};

const showUploadErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.querySelector('.error').cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  document.body.append(errorElement);

  const closeErrorMessage = () => {
    errorElement.remove();
  };

  const errorEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorMessage();
      document.removeEventListener('keydown', errorEscKeydownHandler);
      document.addEventListener('keydown', keydownEscHandler);
    }
  };

  const outsideClickHandler = (evt) => {
    if (evt.target === errorElement) {
      closeErrorMessage();
      document.removeEventListener('keydown', errorEscKeydownHandler);
      document.addEventListener('keydown', keydownEscHandler);
    }
  };

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', errorEscKeydownHandler);
  errorElement.addEventListener('click', outsideClickHandler);
};

const showUploadSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  const successButton = successElement.querySelector('.success__button');
  document.body.append(successElement);

  const closeSuccessMessage = () => {
    successElement.remove();
  };

  const successEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage();
      document.removeEventListener('keydown', successEscKeydownHandler);
    }
  };

  const outsideClickHandler = (evt) => {
    if (evt.target === successElement) {
      closeSuccessMessage();
      document.removeEventListener('keydown', successEscKeydownHandler);
    }
  };

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', successEscKeydownHandler);
  successElement.addEventListener('click', outsideClickHandler);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showDataErrorMessage, showUploadErrorMessage, showUploadSuccessMessage, debounce };
