import '../styles/index.scss';
import template from '../template.html';

export default class Gallery {
  slideWidth = 200;

  constructor({photos, size, current, container}) {
    this.photos = photos;
    this.size = size;
    this.current = current;
    this.container = container

    this.setupLayout();
    this.setupEventHandlers();
  }

  setupLayout() {
    this.container.innerHTML = template({
      sliderWidth: this.slideWidth * this.size,
      photos: this.photos.map((photo, index) => ({
        ...photo,
        index,
        offsetLeft: index * this.slideWidth
      }))
    });
  }

  setupEventHandlers() {
    this.container.querySelector('.slider-btn-next').addEventListener('click', () => {
      console.log('next');
      this.slide('right');
    })
    this.container.querySelector('.slider-btn-prev').addEventListener('click', () => {
      console.log('prev');
      this.slide('left');
    })
  }

  slide(direction) {
    const $slider = document.querySelector('.slider-in');
    const offset = $slider.offsetLeft - (direction === 'left'? -1: 1) * this.slideWidth;
    $slider.style.left = `${offset}px`
  }
}
