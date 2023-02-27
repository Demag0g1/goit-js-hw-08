// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgConteiner = document.querySelector('.gallery');
const createGalleryItem = galleryItems
  .map(item => {
    return `<a class="gallery__item" href="${item.original}" >
        <img class="gallery__image" data-attribute="${item.preview}" src="${item.preview}" alt="${item.description}" title="${item.description}" />
        </a>`;
  })
  .join('');

imgConteiner.insertAdjacentHTML('beforeend', createGalleryItem);

document.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imgSelected = e.target.getAttribute('data-attribute');
});
let lightbox = new SimpleLightbox('.gallery a', {
  onShow: () => {
    document.addEventListener('keydown', closeModal);
  },

  onClose: () => {
    document.removeEventListener('keydown', closeModal);
  },
  captionDelay: 250,
});

function closeModal(e) {
  if (e.key === 'Escape') {
    template.close();
  }
}
