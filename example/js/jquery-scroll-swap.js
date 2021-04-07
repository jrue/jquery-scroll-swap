/**************************
jQuery Scroll Background Swap by Jeremy Rue https://github.com/jrue

LICENSE: CC BY-NC-SA Attribution-NonCommercial-ShareAlike

You are free to remix, adapt, and build upon this work non-commercially, as long as you credit me and license the new creations under the identical terms. 

https://creativecommons.org/licenses/by-nc-sa/4.0/
**************************/


(function($){
  $.scrollSwap = function(el, options){

    var base = this;

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    // Add a reverse reference to the DOM object
    base.$el.data("scrollSwap", base);

    base.init = function(){
      
      //merge options passed in during instantiation with our defaults
      base.options = $.extend({},$.scrollSwap.defaultOptions, options);
      base.data = [];
      base.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/.test(navigator.userAgent);
    };

     
     //set the data, find offset top of each element. Re-run whenever window resizes.
     base.findBreakPoints = function(){
       
       //reset the viewport height if they resize
       base.trueHeight = base.isMobile ? window.innerHeight * base.options.triggerFromTop : $(window).height() * base.options.triggerFromTop;
      
       //empty out the data variable
       base.data.length = 0;
       base.$el.find("[" + base.options.dataImageAttribute + "]").each(function(i,d){
         base.data.push({elm:$(d), image:$(d).data('image'), offset: Math.round($(d).offset().top)});
       });
     }
     
     base.addPlaceHolder = function(){
       
       base.$el.find("[" + base.options.dataImageAttribute + "]").each(function(i,d){
         let placeHolder = $("<div />").css({
           position: "absolute",
           height: "100%",
           width: "100%",
           top: 0,
           left: 0,
           zIndex: -1 - Number(i),
           backgroundImage: "url(" + $(d).data('image') + ")",
           backgroundAttachment: "fixed",
           backgroundRepeat: "no-repeat",
           backgroundSize: "cover",
           backgroundPosition: "center",
           transition: "opacity " + base.options.speed + "s ease-out",
           opacity: 0
         }).addClass("scrollBackgroundHolder");

         placeHolder.appendTo(base.$el);
       });
       base.findBreakPoints();
       
     }

    // Run initializer
    base.init();
  };

  $.scrollSwap.defaultOptions = {
    dataImageAttribute: 'data-image',
    triggerFromTop: 0.75,
    speed: 0.5
  };

  $.fn.scrollSwap = function(options){
    
    return this.each(function(){
      
      //instantiate
      const scroll  = (new $.scrollSwap(this, options));
      let resizeTimer; //for the setTimeout of window resizing
      
      //redo breakpoints if they resize the window
      $(window).on("resize", function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(scroll.findBreakPoints, 200);
      });
      
      scroll.addPlaceHolder(); 

      $(window).on('scroll', function(){
        
        let scrollTop = $(window).scrollTop() + scroll.trueHeight;
          

        scroll.data.forEach(function(d, i){
          
          //if it's after the last one
          if(scrollTop > scroll.data[scroll.data.length - 1].offset){
            $(".scrollBackgroundHolder").not(":nth-child(" + (scroll.data.length - 1) + ")").css("opacity", 0);
            $(".scrollBackgroundHolder").last().css({"opacity":1});
          } else
          if(scrollTop < scroll.data[0].offset){
            $(".scrollBackgroundHolder").css("opacity", 0);
          } else
          if(scrollTop > scroll.data[i].offset && scrollTop < scroll.data[i+1].offset){
            $(".scrollBackgroundHolder").not(":nth-child(" + i + ")").css("opacity", 0);
            $(".scrollBackgroundHolder").eq(i).css({"opacity":1});
          }
          

        });
        
      });

    });
  };
    
})(jQuery);