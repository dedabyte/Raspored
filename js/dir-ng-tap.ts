export default function ngTap() {
  return function (scope, element, attrs) {
    let cancelEvent = false;

    element.on('touchstart', () => {
      element.addClass('active');
      cancelEvent = false;
    });

    element.on('touchmove', () => {
      cancelEvent = true;
      element.removeClass('active');
    });

    element.on('touchend', () => {
      if (cancelEvent)
        return;
      element.removeClass('active');
      scope.$apply(attrs['ngTap']);
    });
  };
}
