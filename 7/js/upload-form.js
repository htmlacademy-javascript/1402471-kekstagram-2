const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

let currentScale = SCALE_DEFAULT;
let currentEffect = 'none';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  const rules = {
    startsWithHash: (tag) => tag.startsWith('#'),
    notOnlyHash: (tag) => tag.length > 1,
    maxLength: (tag) => tag.length <= MAX_HASHTAG_LENGTH,
    validChars: (tag) => /^#[a-zа-яё0-9]+$/i.test(tag),
    unique: (tags) => new Set(tags.map((t) => t.toLowerCase())).size === tags.length,
  };
  return hashtags.every((tag) => (
    rules.startsWithHash(tag) &&
    rules.notOnlyHash(tag) &&
    rules.maxLength(tag) &&
    rules.validChars(tag)
  )) && rules.unique(hashtags);
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  ' Проверьте, что каждый хэштег начинается с #, не содержит пробелов или спецсимволов, не длиннее 20 символов, хэштеги не повторяются.'
);

pristine.addValidator(
  commentInput,
  (value) => !value || value.length <= MAX_COMMENT_LENGTH,
  `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`
);

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydownEsc);
  uploadCancel.addEventListener('click', handleClickCancel);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydownEsc);
  uploadCancel.removeEventListener('click', handleClickCancel);
  uploadForm.reset();
  pristine.reset();
  currentScale = SCALE_DEFAULT;
  scaleControlValue.value = `${SCALE_DEFAULT}%`;
  imgPreview.style.transform = `scale(${SCALE_DEFAULT / 100})`;
  currentEffect = 'none';
  effectLevelContainer.classList.add('hidden');
  imgPreview.style.filter = '';
};

function handleKeydownEsc(evt) {
  if (evt.key === 'Escape' && !document.activeElement.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

const handleChangeFile = () => {
  openForm();
};

uploadFile.addEventListener('change', handleChangeFile);

function handleClickCancel() {
  closeForm();
}

const updateScale = () => {
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  currentScale = Math.max(SCALE_MIN, currentScale - SCALE_STEP);
  updateScale();
});

scaleControlBigger.addEventListener('click', () => {
  currentScale = Math.min(SCALE_MAX, currentScale + SCALE_STEP);
  updateScale();
});

const EFFECTS = {
  none: {
    style: '',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
    defaultValue: 0,
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    defaultValue: 1,
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    defaultValue: 1,
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    defaultValue: 100,
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    defaultValue: 3,
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    defaultValue: 3,
  },
};

const updateEffect = () => {
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider?.destroy();
  effectLevelContainer.classList.add('hidden');
  effectLevelValue.value = '';
  if (currentEffect === 'none') {
    return;
  }
  const { style, min, max, step, unit, defaultValue } = EFFECTS[currentEffect];
  effectLevelContainer.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    start: defaultValue,
    step,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
    imgPreview.style.filter = `${style}(${value}${unit})`;
  });
  effectLevelValue.value = defaultValue;
  imgPreview.style.filter = `${style}(${defaultValue}${unit})`;
};
effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  updateEffect();
});

updateScale();
updateEffect();
