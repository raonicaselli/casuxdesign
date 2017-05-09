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
