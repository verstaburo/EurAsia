const $ = window.$;

export default function childDescribeResize() {
  function changer() {
    const textBlocks = $('.child__text');
    $(textBlocks).css({ height: '' });
    let maxHeight = 0;
    $(textBlocks).each((i, el) => {
      const height = $(el).height();
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    $(textBlocks).css({ height: `${maxHeight}px` });
  }

  changer();
  $(window).on('resize', changer);
}
