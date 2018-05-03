const $ = window.$;

export default function moveStatistic() {
  function shiftBlock() {
    const moveBlock = $('.statistic_patients');
    const mobileParent = $('.patients__mobile-stat');
    const desktopParent = $('.slider__slide_statistic');

    if ($(window).width() < 1024) {
      $(mobileParent).append(moveBlock);
    } else {
      $(desktopParent).append(moveBlock);
      $('.js-slider')[0].swiper.update();
    }
  }

  shiftBlock();

  $(window).on('resize', shiftBlock);
}
