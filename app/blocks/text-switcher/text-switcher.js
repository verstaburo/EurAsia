const $ = window.$;

export default function switchText() {
  $(document).on('click', '.js-text-switcher', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).hasClass('js-text-switcher') ? $(evt.target) : $(evt.target).closest('.js-text-switcher');
    const targetText = $(self).attr('data-target-text');
    $(self).fadeOut();
    $(`[data-hidden-text=${targetText}]`).fadeIn();
  });
}
