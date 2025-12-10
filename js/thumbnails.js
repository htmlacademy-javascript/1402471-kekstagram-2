import {getData} from './api.js';
import {imgFilters} from './filters';
import {toggleVisibilityBigPictureModal} from './big-picture.js';
import {debounce, showDataErrorMessage} from './utils.js';
import { MAX_LENGTH_RANDOM_MINIATURES, TIMEOUT_DELAY } from './constants.js';

const miniature = document.querySelector('#picture').content;
const pictureContainer = document.querySelector('.pictures');
let miniatureData = [];

const clickMiniatureHandler = (evt, dataUser) => {
  evt.preventDefault();
  toggleVisibilityBigPictureModal(dataUser);
};

const removeMiniatures = () => {
  const miniatures = pictureContainer.querySelectorAll('.picture');
  miniatures.forEach((miniatureItem) => {
    miniatureItem.remove();
  });
};

const renderMiniature = (dataUser) => {
  const newMiniature = miniature.cloneNode(true);
  const imagePath = newMiniature.querySelector('.picture__img');
  const likes = newMiniature.querySelector('.picture__likes');
  const comments = newMiniature.querySelector('.picture__comments');
  const containerNewMiniature = newMiniature.querySelector('.picture');
  containerNewMiniature.addEventListener('click', (evt) => clickMiniatureHandler(evt, dataUser));
  imagePath.src = dataUser.url;
  likes.textContent = dataUser.likes;
  comments.textContent = dataUser.comments.length;
  return newMiniature;
};

const renderListMiniature = (list) => {
  removeMiniatures();
  const fragment = document.createDocumentFragment();
  list.forEach((image) => {
    fragment.appendChild(renderMiniature(image));
  });
  pictureContainer.appendChild(fragment);
};

const getRandomMiniatures = (data) => data.sort(() => Math.random() - Math.random()).slice(0, MAX_LENGTH_RANDOM_MINIATURES);

const getDiscussedMiniatures = (data) => data.sort((elementA, elementB) => {
  const countA = elementA.comments.length;
  const countB = elementB.comments.length;
  return countB - countA;
});

const debouncedRenderListMiniature = debounce((data) => renderListMiniature(data), TIMEOUT_DELAY);

(async () => {
  try {
    miniatureData = await getData();
    if (imgFilters) {
      imgFilters.classList.remove('img-filters--inactive');
    }
    renderListMiniature(miniatureData);
  } catch (error) {
    showDataErrorMessage(error);
  }
})();

export { debouncedRenderListMiniature, miniatureData, getRandomMiniatures, getDiscussedMiniatures };


