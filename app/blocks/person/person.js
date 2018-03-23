const $ = window.$;

export default function showMore() {
  $(document).on('click touchstart', '.js-show-more', (evt) => {
    evt.preventDefault();
    const et = evt.target;
    const self = $(et).hasClass('js-show-more') ? $(et) : $(et).closest('.js-show-more');
    const targetContainer = $(self).closest('.person__describe').find('.person__short-info');
    const fullDescribe = $(self).closest('.person__describe').find('.person__full-info');
    $(targetContainer).text($(fullDescribe).text());
    $(self).fadeOut();
  });
}
