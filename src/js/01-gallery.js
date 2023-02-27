// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const imgConteiner = document.querySelector('.gallery');
const createGalleryItem = galleryItems
  .map(item => {
    return `<div class="gallery__item">
        <a class="gallery__link" href="${item.original}" >
        <img class="gallery__image" data-attribute="${item.original}" src="${item.preview}" alt="${item.description}" title="${item.description}" width="340"/>
         
        </a>  
    </div>`;
  })
  .join('');

imgConteiner.insertAdjacentHTML('beforeend', createGalleryItem);

document.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imgSelected = e.target.getAttribute('data-attribute');

  const template = basicLightbox.create(
    `
    <img src="${imgSelected}">
    `,

    {
      onShow: () => {
        document.addEventListener('keydown', closeModal);
      },

      onClose: () => {
        document.removeEventListener('keydown', closeModal);
      },
    }
  );

  template.show();

  function closeModal(e) {
    if (e.key === 'Escape') {
      template.close();
    }
  }
});
