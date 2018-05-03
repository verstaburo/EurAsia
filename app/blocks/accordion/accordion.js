export const HIDDEN = 'accordion/shown';
export const SHOWN = 'accordion/hidden';
export const BEFORE_SHOW = 'accordion/beforeshow';
export const BEFORE_HIDE = 'accordion/beforehide';

const DURATION = 250;

const $ = window.$;

function bodiesSearch(arr) {
  const res = [];
  $(arr).each((i, el) => {
    const elBody = $(el).find('.js-accordion-button').attr('data-target');
    res.push({ head: $(el), body: $(`[data-body*="${elBody}"]`) });
  });
  return res;
}

$(document).on('click', '.js-accordion-button', function (e) {
  e.preventDefault();
  const button = $(this);
  const targetBody = button.attr('data-target');
  const block = button.closest('.accordion');
  const body = $(`[data-body*="${targetBody}"]`);
  const isActive = Number(block.hasClass('is-active'));
  const isMultiple = block.parents('.accordions').data('accordion-multiple');

  if (block.hasClass('is-disabled')) {
    return;
  }

  const beforeEvent = [BEFORE_SHOW, BEFORE_HIDE][isActive];
  const afterEvent = [SHOWN, HIDDEN][isActive];

  body.trigger(beforeEvent).slideToggle(DURATION, () => {
    body.toggleClass('is-active');
    block
      .toggleClass('is-active')
      .trigger(afterEvent);
  });

  if (!isMultiple) {
    const siblings = block.siblings('.accordion.is-active');
    const siblingsBody = bodiesSearch(siblings);

    siblings
      .trigger(BEFORE_HIDE);
    siblingsBody.forEach((el) => {
      $(el.body).slideUp(DURATION, () => {
        $(el.body).toggleClass('is-active');
        $(el.head)
          .removeClass('is-active')
          .trigger(HIDDEN);
      });
    });
  }
});
