const $ = window.$;

export default function showPartners() {
  function showItem(it) {
    const visibility = $(it).attr('data-visible');
    switch (visibility) {
      case 'always':
        break;
      case 'desktop':
        if (document.body.clientWidth >= 1024) {
          $(it).addClass('show').fadeIn();
        }
        break;
      default:
        $(it).addClass('show').fadeIn();
        break;
    }
  }

  function hideItem(it) {
    const visibility = $(it).attr('data-visible');
    switch (visibility) {
      case 'always':
        break;
      case 'desktop':
        if (document.body.clientWidth < 1024) {
          $(it).removeClass('show').fadeOut();
        }
        break;
      default:
        $(it).removeClass('show').fadeOut();
        break;
    }
  }

  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    const resC = (number % 10 < 5) ? number % 10 : 5;
    const res = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[resC];
    return titles[res];
  }

  function switcher(el) {
    const elements = $(el).parent().find('[data-visible]');
    let elementsCount;
    if (document.body.clientWidth < 1024) {
      elementsCount = $(elements).filter('[data-visible="none"]').length + $(elements).filter('[data-visible="desktop"]').length;
    } else {
      elementsCount = $(elements).filter('[data-visible="none"]').length;
    }
    const partners = declOfNum(elementsCount, ['партнер', 'партнера', 'партнеров']);
    if ($(el).hasClass('active')) {
      elements.each((i, it) => {
        hideItem(it);
      });
      $(el).removeClass('active');
      $(el).find('.partners__text').text(`Показать еще ${elementsCount} ${partners}`);
    } else {
      elements.each((i, it) => {
        showItem(it);
      });
      $(el).addClass('active');
      $(el).find('.partners__text').text('Скрыть');
    }
  }

  function preview() {
    const elements = $('[data-visible="desktop"]').not('show');
    const sortelems = $('[data-visible]');
    let elementsCount;
    if (document.body.clientWidth < 1024) {
      elementsCount = $(sortelems).filter('[data-visible="none"]').length + $(sortelems).filter('[data-visible="desktop"]').length;
    } else {
      elementsCount = $(sortelems).filter('[data-visible="none"]').length;
    }
    const partners = declOfNum(elementsCount, ['партнер', 'партнера', 'партнеров']);
    $('.js-switch-visibility').find('.partners__text').text(`Показать еще ${elementsCount} ${partners}`);
    if (document.body.clientWidth < 1024) {
      $(elements).fadeOut();
    } else {
      $(elements).fadeIn();
    }
  }

  preview();
  $(window).on('resize', preview);

  $(document).on('click', '.js-switch-visibility', (evt) => {
    const self = $(evt.target).hasClass('.js-switch-visibility') ? $(evt.target) : $(evt.target).closest('.js-switch-visibility');
    switcher(self);
  });
}
