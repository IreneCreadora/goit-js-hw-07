import { galleryItems } from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
};
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardsMarkup(array) {
  return array
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
        `;
    })
    .join('');
}

refs.galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();
  modalShow(e.target.dataset.source);
}

let instance;

function modalShow(src) {
  instance = basicLightbox.create(
    `<div class="modal">
        <img src="${src}" width="800" height="600"></img>
    </div>`,
    {
      onShow: instance => {
        addListener();
      },
      onClose: instance => {
        removeListener();
      },
    }
  );
  instance.show();
}

function onEscClick(e) {
  if (e.code === 'Escape') {
    instance.close();
  }
}

function addListener() {
  window.addEventListener('keydown', onEscClick);
}

function removeListener() {
  window.removeEventListener('keydown', onEscClick);
}
