const $ = window.$;

export default function floatBlocks() {
  function floatingBlocks() {
    const targetBlocks = $('[data-float-block]');
    targetBlocks.each((i, el) => {
      const nameBlock = $(el).attr('data-float-block');
      const parentDesktopBlock = $(`[data-fbd-place*=${nameBlock}]`);
      const parentMobileBlock = $(`[data-fbm-place*=${nameBlock}]`);

      if (!$(el).closest('.header').length > 0) {
        if ($(window).width() < 1024) {
          $(parentMobileBlock).append(el);
        } else {
          $(parentDesktopBlock).append(el);
        }
      } else if ($(window).width() < 1140) {
        $(parentMobileBlock).append(el);
      } else {
        $(parentDesktopBlock).append(el);
      }
    });
  }

  floatingBlocks();

  $(window).on('resize', floatingBlocks);
}
