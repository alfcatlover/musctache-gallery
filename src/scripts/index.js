import Gallery from './gallery';

const gallery = new Gallery({
  photos: [
    {id: 0, src: 'https://i.picsum.photos/id/318/100/300.jpg'},
    {id: 1, src: 'https://i.picsum.photos/id/319/200/200.jpg'},
    {id: 2, src: 'https://i.picsum.photos/id/320/200/200.jpg'},
    {id: 3, src: 'https://i.picsum.photos/id/321/200/200.jpg'},
    {id: 4, src: 'https://i.picsum.photos/id/322/200/200.jpg'},
    {id: 5, src: 'https://i.picsum.photos/id/323/200/200.jpg'},
    {id: 6, src: 'https://i.picsum.photos/id/324/200/200.jpg'},
    {id: 7, src: 'https://i.picsum.photos/id/325/200/200.jpg'},
    {id: 8, src: 'https://i.picsum.photos/id/326/200/200.jpg'},
  ],
  size: 5,
  current: '2',
  container: document.getElementById('gallery')
})
