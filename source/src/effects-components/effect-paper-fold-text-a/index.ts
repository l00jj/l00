import coverUrl from './index.jpg?url';
export default {
  coverUrl,
  "title": "折纸效果",
  "tags": ["paper", "fold", "unfold"],
  //"urls": ["https://www.youtube.com/watch?v=s8oRaEe32JA","https://www.youtube.com/watch?v=NLjkRXdgFoI"],
  "date": "2022.06.16 07:00:00",
  "vue": () => import('@src/effects-components/effect-paper-fold/effect-paper-fold.vue')
};