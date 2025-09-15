(function ($) {

  "use strict";

  // Preloader: hide on DOM ready for faster paint
  $(function () {
    $('.preloader').fadeOut(300);
  });

  // Close navbar on link click (mobile)
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  // Add subtle shadow when scrolled
  $(window).on('scroll', function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  // Smooth scroll with dynamic offset (navbar height)
  $(function () {
    $('.custom-navbar a').off('click.smooth').on('click.smooth', function (event) {
      var href = $(this).attr('href');
      if (!href || href.charAt(0) !== '#') return; // external links
      var $target = $(href);
      if ($target.length) {
        event.preventDefault();
        var offset = document.querySelector('.navbar').offsetHeight || 49;
        $('html, body').stop(true, false).animate({
          scrollTop: $target.offset().top - offset
        }, 300, 'swing');
      }
    });
  });

  // WOW Animation js
  new WOW({ mobile: false }).init();

})(jQuery);
