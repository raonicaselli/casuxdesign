/**
A simple Grunt project - 0.1.0
http://markgoodyear.com
Copyright (c) 2018 Mark Goodyear
License: MIT
*/
const token = "5867d688-4e58-4ab4-bcdb-1396e024d430";
const $formContact = document.querySelector("#contact-form");

const sendForm = event => {
  event.preventDefault();
  const message = {
    name: document.querySelector("#cname").value,
    email: document.querySelector("#cemail").value,
    text: document.querySelector("#cmessage").value
  };
  smtpJS(message);
};
const smtpJS = message => {
  try {
    Email.send(
      "raonicaselli@gmail.com",
      "raonicaselli@gmail.com",
      "Nova mensagem de Cas UX Design",
      `${message.name}: ${message.email} - ${message.text}`,
      { token,
        callback: alert("Obrigado pela mensagem, em breve entratei em contato.")
      }
    );
  } catch (e) {
    alert("Erro");
  }
};

$formContact.addEventListener("submit", sendForm);

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

  // function openProject(param1, param2){
  //   $(param1).click(function(e){
  //     e.preventDefault();
  //     $("#project-page").load("html/projects/" + param2 + ".html", function(){
  //       $(".section-wrapper").addClass("visible");
  //       $(".behance-container").addClass("visible");
  //     });
  //     $("html").addClass("noscroll");
  //   });
  // }
  //
  // openProject("#open-dolphin", "dolphin");



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
