/* eslint-disable no-unused-vars */
import $ from 'jquery';

// http://iamceege.github.io/tooltipster/
import tooltipster from 'tooltipster';

export default function tooltips() {
  $('.js-tooltip').tooltipster({
    animation: 'fade',
    delay: 0,
    distance: 0,
    side: 'top',
    theme: 'tooltipster-borderless',
    trigger: 'click',
    functionInit(instance, helper) {
      const content = $(helper.origin).find('.tooltip-content').detach();
      instance.content(content);
    },
    functionBefore(instance, helper) {
      $(helper.origin).addClass('is-open');
    },
    functionAfter(instance, helper) {
      $(helper.origin).removeClass('is-open');
    },
    zIndex: 40,
  });

  let animationFree = true;
  // Закрываем тултип на разрешения ниже 1024
  function mobileTooltipClose(elem) {
    if (animationFree) {
      animationFree = false;
      $(elem).closest('.pin').animate({
        height: `${$(elem).attr('data-base-height')}px`,
      }, {
        start() {
          $(elem).removeClass('is-open');
        },
        complete() {
          $(this).removeClass('is-opened');
          animationFree = true;
        },
      });
    } else {
      setTimeout(() => {
        mobileTooltipClose(elem);
      }, 100);
    }
  }
  // Открываем тултип на разрешения ниже 1024
  function mobileTooltipOpen(elem) {
    $('.js-tooltip.is-open').each((i, el) => {
      mobileTooltipClose(el);
    });
    if (animationFree) {
      animationFree = false;
      $(elem).closest('.pin').animate({
        height: `${$(elem).attr('data-open-height')}px`,
      }, {
        start() {
          $(this).addClass('is-opened');
        },
        complete() {
          $(elem).addClass('is-open');
          animationFree = true;
        },
      });
    } else {
      setTimeout(() => {
        mobileTooltipOpen(elem);
      }, 100);
    }
  }

  $(document).on('click', '.js-tooltip', (evt) => {
    if ($(window).width() < 1024) {
      evt.preventDefault();
      const self = $(evt.target).hasClass('js-tooltip') ? $(evt.target) : $(evt.target).closest('.js-tooltip');
      mobileTooltipOpen(self);
    }
  });
  $(document).on('click', '.js-tooltip-close', (evt) => {
    if ($(window).width() < 1024) {
      evt.preventDefault();
      const self = $(evt.target).hasClass('js-tooltip-close') ? $(evt.target) : $(evt.target).closest('.js-tooltip-close');
      const targetEl = $(self).closest('.pin').find('.js-tooltip');
      mobileTooltipClose(targetEl);
    }
  });

  function switchTooltipster() {
    if ($(window).width() < 1024) {
      $('.js-tooltip').tooltipster('disable');
      $('.js-tooltip').each((i, el) => {
        $(el).attr('data-base-height', $(el).outerHeight());
        const content = $(el).tooltipster('content');
        $(el).append(content);
        $(el).find('.tooltip-content').addClass('is-copy');
        $(el).attr('data-open-height', $(el).find('.tooltip-content').outerHeight());
        if ($(el).hasClass('is-open')) {
          $(el).closest('.pin').css({ height: `${$(el).attr('data-open-height')}px` });
        }
      });
    } else {
      $('.tooltip-content.is-copy').remove();
      $('.js-tooltip').each((i, el) => {
        $(el).removeClass('is-open');
        $(el).closest('.pin').removeClass('is-opened');
        $(el).closest('.pin').css({ height: '' });
      });
      $('.js-tooltip').tooltipster('enable');
    }
  }

  switchTooltipster();

  $(window).on('resize', switchTooltipster);
}
/* eslint-enable no-unused-vars */
