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



});

jQuery(document).ready(function($){

  $("a[href^='#']").click(function(event) {
    event.preventDefault();
    console.log("oi");
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
