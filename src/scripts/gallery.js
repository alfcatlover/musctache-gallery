import '../styles/index.scss';
import template from '../template.html';

export default class Gallery {
  constructor({
                photos,
                size,
                current,
                container,
                slideWidth
              }) {
    this.photos = photos;
    this.size = size;
    this.slideWidth = slideWidth;
    this.currentIndex = this.getPhotoIndexById(current);
    this.prevSlide = this.currentIndex ? this.currentIndex - 1 : 1;
    this.container = container;

    this.setupLayout();
    this.setupEventHandlers();
    this.scrollToSlide(this.currentIndex);
  }

  getPhotoIndexById(id) {
    return this.photos.reduce((acc, photo, index) => photo.id === id ? index : acc, 0);
  }

  getSrcWithDeviceRatio(src) {
    const {devicePixelRatio} = window;
    if (devicePixelRatio > 1 && devicePixelRatio <= 2) {
      return src.replace(/(\w+)\.(\w+)/, "$1@2x.$2");
    } else if (devicePixelRatio > 2) {
      return src.replace(/(\w+)\.(\w+)/, "$1@3x.$2");
    } else {
      return src;
    }
  }

  setupLayout() {
    this.container.innerHTML = template({
      sliderWidth: this.slideWidth * this.size,
      slideWidth: this.slideWidth,
      photos: this.photos.map(({id, src}, index) => ({
        id,
        src: this.getSrcWithDeviceRatio(src),
        index,
        offsetLeft: index * this.slideWidth
      }))
    });
  }

  setupEventHandlers() {
    this.container.querySelector('.slider-btn-next').addEventListener('click', () => {
      this.scrollToSlide(this.currentIndex + 1);
    });
    this.container.querySelector('.slider-btn-prev').addEventListener('click', () => {
      this.scrollToSlide(this.currentIndex - 1);
    });

    this.container.querySelectorAll('.slide').forEach(($slide) => {
      $slide.addEventListener('click', () => {
        this.scrollToSlide(parseInt($slide.dataset.index));
      })
    });

    document.onkeydown = ({keyCode}) => {
      // left arrow press
      if (keyCode === 37) {
        this.scrollToSlide(this.currentIndex - 1);
      }
      // right arrow press
      if (keyCode === 39) {
        this.scrollToSlide(this.currentIndex + 1);
      }
    };
  }

  scrollToSlide(currentSlide) {
    if (currentSlide >= 0 && currentSlide < this.photos.length) {
      this.prevSlide = this.currentIndex;
      this.currentIndex = currentSlide;
      const $slider = document.querySelector('.slider-in');
      let offset = (this.slideWidth * -currentSlide) + (this.slideWidth * Math.ceil((this.size - 1) / 2));

      if (currentSlide <= Math.ceil(this.size / 2)) {
        offset = 0;
      } else if (currentSlide >= Math.floor(this.photos.length - this.size / 2)) {//6
        offset = -(this.photos.length - this.size) * this.slideWidth;
      }

      $slider.style.transform = `translateX(${offset}px)`;
      $slider.querySelector(`.slide:nth-child(${this.prevSlide + 1})`).classList.remove('slide-active');
      $slider.querySelector(`.slide:nth-child(${currentSlide + 1})`).classList.add('slide-active');
    }
  }
}
