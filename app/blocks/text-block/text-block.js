const $ = window.$;

export default function ffDetect() {
  const ua = navigator.userAgent;
  if (ua.search(/Firefox/) !== -1) {
    $('html').addClass('ff');
  }
}
