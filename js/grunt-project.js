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
    var topScroll = $(this).scrollTop();

    if (topScroll > logoScroll){
      $(".header").addClass("visible");
    } else {
      $(".header").removeClass("visible");
    }

    var about = $("#about").offset().top - 64;
    var portfolio = $("#portfolio").offset().top - 64;
    var design = $("#process").offset().top - 64;
    var contact = $("#contact").offset().top - 64;

    if (topScroll >= about && topScroll < portfolio){
      $("a").removeClass("active");
      $("a[href='#about']").addClass("active");
    } else if (topScroll >= portfolio && topScroll < design) {
      $("a").removeClass("active");
      $("a[href='#portfolio']").addClass("active");
    } else if (topScroll >= design && topScroll < contact) {
      $("a").removeClass("active");
      $("a[href='#process']").addClass("active");
    } else if (topScroll >= contact) {
      $("a").removeClass("active");
      $("a[href='#contact']").addClass("active");
    } else {
      $("a").removeClass("active");
      $("a[href='#home']").addClass("active");
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

  // Add class to label in form
  $(".input").focus(function(){
    $(this).prev(["label"]).addClass("active");
  }).focusout(function(){
    $(this).prev(["label"]).removeClass("active");
  });


  // Open portfolio projects
  $("#open-dolphin").click(function(e){
    e.preventDefault();
    $("#project-page").load("html/projects/dolphin.html", function(){
      $(".section-wrapper").addClass("visible");
    });
    $("html").addClass("noscroll");
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
