import { miniatureData, debouncedRenderListMiniature, getRandomMiniatures, getDiscussedMiniatures } from './thumbnails';

export const imgFilters = document.querySelector('.img-filters');

const defaultFilterBtn = imgFilters.querySelector('#filter-default');
const randomFilterBtn = imgFilters.querySelector('#filter-random');
const discussedFilterBtn = imgFilters.querySelector('#filter-discussed');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

const setActiveButton = () => {
  for (const button of filterButtons) {
    if (button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  }
};

const clickDefaultFilterBtnHandler = (evt) => {
  evt.preventDefault();
  setActiveButton(evt.target);
  evt.target.classList.add('img-filters__button--active');
  debouncedRenderListMiniature(miniatureData);
};

const clickRandomFilterBtnHandler = (evt) => {
  evt.preventDefault();
  setActiveButton(evt.target);
  evt.target.classList.add('img-filters__button--active');
  const data = getRandomMiniatures(miniatureData);
  debouncedRenderListMiniature(data);
};

const clickDiscussedFilterBtnHandler = (evt) => {
  evt.preventDefault();
  setActiveButton(evt.target);
  evt.target.classList.add('img-filters__button--active');
  const data = getDiscussedMiniatures(miniatureData);
  debouncedRenderListMiniature(data);
};

defaultFilterBtn.addEventListener('click', clickDefaultFilterBtnHandler);
randomFilterBtn.addEventListener('click', clickRandomFilterBtnHandler);
discussedFilterBtn.addEventListener('click', clickDiscussedFilterBtnHandler);


