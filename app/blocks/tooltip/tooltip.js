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
}
/* eslint-enable no-unused-vars */
