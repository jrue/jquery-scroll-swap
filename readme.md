jQuery Scroll Background Swap
-----------------------------

Swap out the background image of an element as you scroll down. [See example here (scroll down the page)](https://jrue.github.io/jquery-scroll-swap/example/)

Download the js file here:
[https://github.com/jrue/jquery-scroll-swap/blob/main/example/js/jquery-scroll-swap.js](https://github.com/jrue/jquery-scroll-swap/blob/main/example/js/jquery-scroll-swap.js)

When the piece of text comes into view (default 75% from top of viewport) it will swap the background image with the data-image attribute image.

Simply add `data-image` attribute with the URL to the image. The `data-position` is optional, but will allow you to position the text box on the left or right side of the screen. The default is center.

HTML:

```html
<div class="scroll-container">
  <div data-image="picture1.jpg">text</div>
  <div data-image="picture2.jpg">text</div>
  <div data-image="picture3.jpg">text</div>
  <div data-image="picture4.jpg" data-position="left">text</div>
  <div data-image="picture5.jpg" data-position="right">text</div>
</div>
```

JavaScript:

```javascript
$('.scroll-container').scrollSwap();
```

#### Options

You can include these options during instatiation.

Here are the default options:

```javascript
$('.scroll-container').scrollSwap({
    dataImageAttribute: 'image',
    triggerFromTop: 0.75,
    speed: 0.5,
    noCSS: false,
    spreadDistance: "75vh",
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: '50%'
});
```

* **dataImageAttribute** - Change the default attribute used to find the image. i.e. `data-image="picture1.jpg"`
* **triggerFromTop** - The percentage from the top of the viewport when the background should trigger. A 1 means as it comes into view. 0.5 is in the middle of the screen.
* **speed** - Speed of cross disolve.
* **noCSS** - Use your own CSS and disregard all of the built-in default CSS.
* **spreadDistance** - How many pixels/vh between the text elements.
* **backgroundColor** - The background color of the text boxes
* **width** - The width of each text box.



