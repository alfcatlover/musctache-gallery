import '../styles/index.scss';
import template from '../template.html';

const view = {
  "photos": [
    { id: 0, src:'0'},
    { id: 1, src:'1'},
    { id: 2, src:'2'},
    { id: 3, src:'3'},
  ]
};

const html = template(view);

document.getElementById('app').innerHTML = html;

console.log('t', html);
