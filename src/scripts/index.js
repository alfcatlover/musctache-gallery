import Gallery from './gallery';

const gallery = new Gallery({
  photos: [
    {id: '0', src: '/public/images/1.jpg'},
    {id: '1', src: '/public/images/2.jpg'},
    {id: '2', src: '/public/images/3.jpg'},
    {id: '3', src: '/public/images/4.jpg'},
    {id: '4', src: '/public/images/5.jpg'},
    {id: '5', src: '/public/images/6.jpg'},
    {id: '6', src: '/public/images/7.jpg'},
    {id: '7', src: '/public/images/8.jpg'},
    {id: '8', src: '/public/images/9.jpg'}
  ],
  size: 5,
  current: '3',
  container: document.getElementById('gallery'),
  ///Optional params
  slideWidth: 165
});

