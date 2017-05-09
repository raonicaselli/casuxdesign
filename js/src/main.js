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



});
