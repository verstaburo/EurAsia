// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-fancybox').fancybox({
    afterLoad: freeze,
    afterClose: unfreeze,
  });

  $(document).on('click', '.js-popup', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).hasClass('.js-popup') ? $(evt.target) : $(evt.target).closest('.js-popup');
    const targetPopup = $(self).attr('href').split('#').pop();
    const currentPopup = $('.popups').attr('data-active-popup');
    const targetLink = $(self).attr('data-target-news');
    if (targetPopup !== 'child') {
      if ($('.popups').hasClass('is-active') && currentPopup !== targetPopup) {
        $(`#${currentPopup}`).fadeOut(300);
        $(`#${targetPopup}`).fadeIn(300);
      } else {
        freeze();
        $('.popups').attr('data-active-popup', targetPopup);
        $(`#${targetPopup}`).fadeIn(300);
        $('.popups').addClass('is-active');
        $('.overlay').addClass('is-active');
        if (targetLink) {
          $('.popups__wrapper').stop().animate({
            scrollTop: ($(`#${targetLink}`).offset().top - 60),
          }, 1000, 'swing');
        }
      }
    } else {
      $.getJSON('assets/child-info-popup.json', (data) => {
        const base = data;
        const childId = $(self).attr('data-child-id');
        const childInfo = base[childId];
        $(`#${targetPopup}`).find('[data-child-photo]').attr('src', childInfo.photo);
        $(`#${targetPopup}`).find('[data-child-diagnosis-short]').text(childInfo['diagnosis-short']);
        $(`#${targetPopup}`).find('[data-child-name]').text(childInfo.name);
        $(`#${targetPopup}`).find('[data-child-info]').text(childInfo.info);
        $(`#${targetPopup}`).find('[data-child-diagnosis-full]').text(childInfo['diagnosis-full']);
        $(`#${targetPopup}`).find('[data-child-epicrisis]').text(childInfo.epicrisis);
        if ($('.popups').hasClass('is-active') && currentPopup !== targetPopup) {
          $(`#${currentPopup}`).fadeOut(300);
          $(`#${targetPopup}`).fadeIn(300);
        } else {
          freeze();
          $('.popups').attr('data-active-popup', targetPopup);
          $(`#${targetPopup}`).fadeIn(300);
          $('.popups').addClass('is-active');
          $('.overlay').addClass('is-active');
          if (targetLink) {
            $('.popups__wrapper').stop().animate({
              scrollTop: ($(`#${targetLink}`).offset().top - 60),
            }, 1000, 'swing');
          }
        }
      });
    }
    $('.header__navigation').removeClass('is-active');
  });
  $(document).on('click', '.js-popup-close,.overlay', (evt) => {
    evt.preventDefault();
    unfreeze();
    $('.popup').fadeOut();
    $('.popups').removeClass('is-active').attr('data-active-popup', '');
    $('.overlay').removeClass('is-active');
    $('.header__navigation').removeClass('is-active');
  });
}
