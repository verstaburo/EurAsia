/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  const mySlider = new Swiper('.js-slider', {
    speed: 700,
    slidesPerView: 'auto',
    freeMode: true,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
  });
  const scrollSliderOptions = {
    direction: 'vertical',
    wrapperClass: 'main__wrapper',
    slideClass: 'news-list',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    },
    mousewheel: true,
    roundLengths: true,
  };
  const newsSliderOptions = {
    speed: 700,
    slidesPerView: 'auto',
    freeMode: true,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
  };
  let newsSlider;
  let scrollSlider;
  if ($(window).width() < 1024) {
    newsSlider = new Swiper('.js-slider-news', newsSliderOptions);
  } else {
    scrollSlider = new Swiper('.js-slider-scroll', scrollSliderOptions);
  }

  $(window).on('resize', () => {
    if ($(window).width() < 1024) {
      if (scrollSlider) {
        scrollSlider.destroy();
      }
      newsSlider = new Swiper('.js-slider-news', newsSliderOptions);
    } else {
      if (newsSlider) {
        newsSlider.destroy();
      }
      scrollSlider = new Swiper('.js-slider-scroll', scrollSliderOptions);
    }
  });
}
/* eslint-enable no-unused-vars */
