const $ = window.$;

export default function headerResize() {
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
