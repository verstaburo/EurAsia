// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-fancybox').fancybox({
    afterLoad: freeze,
    afterClose: unfreeze,
  });

  $(document).on('click touchstart', '.js-popup', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).hasClass('.js-popup') ? $(evt.target) : $(evt.target).closest('.js-popup');
    const targetPopup = $(self).attr('href').split('#').pop();
    const currentPopup = $('.popups').attr('data-active-popup');
    const targetLink = $(self).attr('data-target-news');
    if ($('.popups').hasClass('is-active') && currentPopup !== targetPopup) {
      $(`#${currentPopup}`).fadeOut(300);
      $(`#${targetPopup}`).fadeIn(300);
    } else {
      freeze();
      $('.popups').attr('data-active-popup', targetPopup);
      $(`#${targetPopup}`).fadeIn(300);
      $('.popups').addClass('is-active');
      $('.overlay').addClass('is-active');
      if (targetLink.length > 0) {
        $('.popups__wrapper').stop().animate({
          scrollTop: ($(`#${targetLink}`).offset().top - 60),
        }, 1000, 'swing');
      }
    }
  });
  $(document).on('click touchstart', '.js-popup-close,.overlay', (evt) => {
    evt.preventDefault();
    unfreeze();
    $('.popup').fadeOut();
    $('.popups').removeClass('is-active').attr('data-active-popup', '');
    $('.overlay').removeClass('is-active');
  });
}
