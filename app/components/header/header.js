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
    $('.header__navigation').addClass('is-active');
    $('.overlay').addClass('is-active');
  });

  $(document).on('click', '.js-close-menu', (evt) => {
    evt.preventDefault();
    $('.header__navigation').removeClass('is-active');
    $('.overlay').removeClass('is-active');
  });
}
