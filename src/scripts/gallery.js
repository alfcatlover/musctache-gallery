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
      this.setCurrentSlide(this.currentIndex + 1);
    });
    this.container.querySelector('.slider-btn-prev').addEventListener('click', () => {
      this.setCurrentSlide(this.currentIndex - 1);
    });

    this.container.querySelectorAll('.slide').forEach(($slide) => {
      $slide.addEventListener('click', () => {
        debugger;
        this.setCurrentSlide(parseInt($slide.dataset.index));
      })
    })
  }

  setCurrentSlide(currentSlide) {
    if (currentSlide >= 0 && currentSlide < this.photos.length) {
      this.prevSlide = this.currentIndex;
      this.currentIndex = currentSlide;

      const $slider = document.querySelector('.slider-in');
      const maxOffset = this.photos.length * this.slideWidth - (this.size - 1) * this.slideWidth;
      const offset = (this.slideWidth * -currentSlide) + (this.slideWidth * Math.ceil((this.size - 1) / 2));

      if (offset <= 0 && Math.abs(offset) < maxOffset) {
        $slider.style.left = `${offset}px`;
      }

      $slider.querySelector(`.slide:nth-child(${this.prevSlide + 1})`).classList.remove('slide-active');
      $slider.querySelector(`.slide:nth-child(${currentSlide + 1})`).classList.add('slide-active');
    }
  }
}
