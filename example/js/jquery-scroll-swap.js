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
      base.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/.test(navigator.userAgent);

      //if mobile, let text boxes take up most of the width
      if(base.isMobile && base.options.noCSS === false){
        base.options.width = '90%';
      }

    };

     
    //set the data, find offset top of each element. Re-run whenever window resizes.
    base.findBreakPoints = function(){
       
      //reset the viewport height if they resize
      base.trueHeight = base.isMobile ? window.innerHeight * base.options.triggerFromTop : $(window).height() * base.options.triggerFromTop;
      
      //empty out the data variable
      base.data.length = 0;
      base.$el.find("[ data-" + base.options.dataImageAttribute + "]").each(function(i,d){
        base.data.push({elm:$(d), image:$(d).data('image'), offset: Math.round($(d).offset().top)});
      });
    }
    

    base.addPlaceHolder = function(){

      //unless they want to do their own CSS stuff, we need the container position relative.
      if(base.options.noCSS === false){
        base.$el.css({
          position:'relative',
          zIndex:1,
          overflow:'hidden',
          width:'100%',
          height:'100%',
          background: 'none'
        });
      }
       
      //base.$el.find("[" + base.options.dataImageAttribute + "]").each(function(i,d){
      $('> *', base.$el).each(function(i,d){


        const image = $(d).data(base.options.dataImageAttribute);
        let placeHolder;
        
      
        //create placeholder divs for each image, background position fixed.
        if(typeof image !== 'undefined'){

          placeHolder = $("<div />").css({
            position: "fixed",
            pointerEvents: "none",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
            zIndex: 999 - Number(i),
            backgroundImage: "url(" + image + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity " + base.options.speed + "s ease-out",
            opacity: 0
          }).addClass("scrollBackgroundHolder");

        }


        //Make sure the text is on top. $(d) are the p tags, first level child elements,
        //regardless if they have a data element or not. 
        if(base.options.noCSS == false){

          $(d).css({
            position:'relative',
            zIndex: 1000,
            backgroundColor:'transparent',
            marginTop: base.options.spreadDistance,
            marginBottom: base.options.spreadDistance,
            width: base.options.width,
            padding: '1.3rem',
            backgroundColor: base.options.backgroundColor
          });

        }


        //default center text, or if they explicitly say data-position="center"
        if(typeof $(d).data('position') == 'undefined' || $(d).data('position').toLowerCase() == 'center'){
          $(d).css({
            marginLeft: 'auto',
            marginRight: 'auto'
          });
        }


        //left justify text if they have data-position="left"
        if(typeof $(d).data('position') != 'undefined' && $(d).data('position').toLowerCase() == 'left'){
          $(d).css({
            marginLeft: '5%',
            marginRight: 'auto',
            width: base.options.width
          });
        }

        //left justify text if they have data-position="left"
        if(typeof $(d).data('position') != 'undefined' && $(d).data('position').toLowerCase() == 'right'){
          $(d).css({
            marginLeft: 'auto',
            marginRight: '5%',
            width: base.options.width
          });
        }

        //if they have a data-image attribute, append the placeholder background image
        if(typeof image !== 'undefined'){
          placeHolder.appendTo(base.$el);
        }

      });
      base.findBreakPoints();
       
    }

    // Run initializer
    base.init();
  };

  $.scrollSwap.defaultOptions = {
    dataImageAttribute: 'image',
    triggerFromTop: 0.75,
    speed: 0.5,
    noCSS: false,
    spreadDistance: "75vh",
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: '50%'
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

          //if it's before the first text box
          if(scrollTop - scroll.trueHeight + $(window).height() < scroll.data[0].offset){
            $(".scrollBackgroundHolder").css({"opacity":0});
          } else

          //if it's ON the first box
          if(scrollTop - scroll.trueHeight + $(window).height() > scroll.data[0].offset && scrollTop < scroll.data[1].offset){
            $(".scrollBackgroundHolder").not(":nth-child(0)").css("opacity", 0);
            $(".scrollBackgroundHolder").first().css({"opacity":1});
          } else

          //if it's after the last one
          if(scrollTop > scroll.data[scroll.data.length - 1].offset + ($(window).height() * scroll.options.triggerFromTop)){
            $(".scrollBackgroundHolder").last().css({"opacity":0});
          } else

          //if it's ON the last text box
          if(scrollTop > scroll.data[scroll.data.length - 1].offset){
            $(".scrollBackgroundHolder").not(":nth-child(" + (scroll.data.length - 1) + ")").css("opacity", 0);
            $(".scrollBackgroundHolder").last().css({"opacity":1});
          } else

          //if it's between text boxes
          if(scrollTop > scroll.data[i].offset && scrollTop < scroll.data[i+1].offset){
            $(".scrollBackgroundHolder").not(":nth-child(" + i + ")").css("opacity", 0);
            $(".scrollBackgroundHolder").eq(i).css({"opacity":1});
          } 

          

        });
        
      });

    });
  };
    
})(jQuery);