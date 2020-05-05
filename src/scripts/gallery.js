import '../styles/index.scss';
import template from '../template.html';

export default class Gallery {
  slideWidth = 200;

  constructor({photos, size, current, container}) {
    this.photos = photos;
    this.size = size;
    this.current = current;
    this.currentIndex = this.getPhotoIndexById(current);

    this.prevSlide = this.currentIndex ? this.currentIndex - 1 : 1;
    this.container = container
    this.setupLayout();
    this.setupEventHandlers();
    this.setCurrentSlide(this.currentIndex);
  }

  getPhotoIndexById(id) {
    return this.photos.reduce((acc, photo, index) => photo.id === id ? index : acc, 0);
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
      if (this.currentIndex < this.photos.length - this.size) {
        this.setCurrentSlide(this.currentIndex + 1);
      }
    })
    this.container.querySelector('.slider-btn-prev').addEventListener('click', () => {
      console.log('prev');
      if (this.currentIndex > 0) {
        this.setCurrentSlide(this.currentIndex - 1);
      }
    })
  }

  setCurrentSlide(currentSlide) {
    this.prevSlide = this.currentIndex;
    this.currentIndex = currentSlide;

    const $slider = document.querySelector('.slider-in');
    const offset = this.slideWidth * -currentSlide;
    $slider.style.left = `${offset}px`;

    $slider.querySelector(`.slide:nth-child(${this.prevSlide + 1})`).classList.remove('slide-active');
    $slider.querySelector(`.slide:nth-child(${currentSlide + 1})`).classList.add('slide-active');

  }
}
