import '../styles/index.scss';
import template from '../template.html';

export default class Gallery{
  slideWidth = 200;
  constructor({photos, size, current, container}) {
    container.innerHTML = template({
      sliderWidth: this.slideWidth * size,
      photos: photos.map((photo, index)=>({
        ...photo,
        index,
        offsetLeft: index* this.slideWidth
      }))
    });
  }
}
