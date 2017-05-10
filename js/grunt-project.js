/**
A simple Grunt project - 0.1.0
http://markgoodyear.com
Copyright (c) 2017 Mark Goodyear
License: MIT
*/
// main.js

jQuery(document).ready(function($){

  // Add class to header to animate it coming down
  var logoScroll = $(window).height() / 1.2;

  $(window).scroll(function(){
    var topScroll = $(document).scrollTop();

    if (topScroll > logoScroll){
      $(".header").addClass("visible");
    } else {
      $(".header").removeClass("visible");
    }
  });

  // Add slider functions
  $(".portfolio-slider").unslider({
    speed: 300,
    arrows: {
      prev: "<a class='slider-arrow prev mdi mdi-chevron-left' alt='Previous slide'></a>",
      next: "<a class='slider-arrow next mdi mdi-chevron-right' alt='Next slide'></a>",
    }
  });

  $(".process-slider").unslider({
    speed: 300,
    arrows: {
      prev: "<a class='slider-arrow prev mdi mdi-chevron-left' alt='Previous slide'></a>",
      next: "<a class='slider-arrow next mdi mdi-chevron-right' alt='Next slide'></a>",
    }
  });


});

jQuery(document).ready(function($){

  $("a[href^='#']").click(function(event) {
    event.preventDefault();
    if (location.pathname.replace(/^\//,"") === this.pathname.replace(/^\//,"")) {

        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
        if (target.length) {
          $("html,body").animate({
            scrollTop: target.offset().top
          }, 400);
          return false;
        }
    }
  });

});
