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
      $("div.header").addClass("visible");
    } else {
      $("div.header").removeClass("visible");
    }
  });

});

jQuery(document).ready(function($){

  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(':focus')) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

});

// HTML Templates load with jQuery

jQuery(document).ready(function($){

  $("#header").load("./templates/header.html");
  $("#home").load("./templates/home.html");

});
