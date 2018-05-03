const $ = window.$;

export default function floatBlocks() {
  function floatingBlocks() {
    const targetBlocks = $('[data-float-block]');
    targetBlocks.each((i, el) => {
      const nameBlock = $(el).attr('data-float-block');
      const parentDesktopBlock = $(`[data-fbd-place*=${nameBlock}]`);
      const parentMobileBlock = $(`[data-fbm-place*=${nameBlock}]`);

      if (document.body.clientWidth < 1024) {
        $(parentMobileBlock).append(el);
      } else {
        $(parentDesktopBlock).append(el);
      }
    });
  }

  floatingBlocks();

  $(window).on('resize', floatingBlocks);
}
