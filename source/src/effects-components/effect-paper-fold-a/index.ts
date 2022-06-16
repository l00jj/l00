import coverUrl from './index.jpg?url';
export default {
  coverUrl,
  "title": "折纸效果",
  "tags": ["paper", "fold", "unfold"],
  //"urls": ["https://www.youtube.com/watch?v=vWZa3hMn9qo"],
  "date": "2022.06.14 07:00:00",
  "vue": () => import('@src/effects-components/effect-paper-fold/effect-paper-fold.vue')
};