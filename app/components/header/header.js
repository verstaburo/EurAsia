// import { freeze, unfreeze } from '../../blocks/js-functions/freeze';

const $ = window.$;

export function headerResize() {
  $(window).on('scroll', () => {
    const sT = $(window).scrollTop();
    const wH = $(window).innerHeight();
    if (sT > wH + 1) {
      $('.header').addClass('is-small');
    } else {
      $('.header').removeClass('is-small');
    }
  });
}

export function openMenu() {
  $(document).on('click', '.js-menu', (evt) => {
    evt.preventDefault();
    $('.js-menu').toggleClass('js-close-menu');
    if ($(window).width() >= 1140) {
      $('.header__menu-anchors').addClass('is-active');
      $('.header__navigation').removeClass('is-active');
    } else {
      $('.header__navigation').addClass('is-active');
      $('.header__menu-anchors').removeClass('is-active');
    }
    $('.overlay').addClass('is-active');
    // freeze();
  });

  $(document).on('click', '.js-close-menu', (evt) => {
    evt.preventDefault();
    // unfreeze();
    $('.header__navigation').removeClass('is-active');
    $('.header__menu-anchors').removeClass('is-active');
    $('.overlay').removeClass('is-active');
    $('.js-menu').removeClass('js-close-menu');
  });
}
