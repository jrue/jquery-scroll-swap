jQuery Scroll Background Swap
-----------------------------

Swap out the background image of an element as you scroll down. See example index.html

The file is in the js folder.

When the piece of text comes into view (default 75% from top of viewport) it will swap the background image with the data-image attribute image.

HTML:

```html
<div class="scroll-container">
  <div data-image="picture1.jpg">text</div>
  <div data-image="picture2.jpg">text</div>
  <div data-image="picture3.jpg">text</div>
  <div data-image="picture4.jpg">text</div>
  <div data-image="picture5.jpg">text</div>
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
  dataImageAttribute: 'data-image',
  triggerFromTop: 0.75,
  speed: 0.5
});
```

* **dataImageAttribute** - Change the default attribute used to find the image. i.e. `data-image="picture1.jpg"`
* **triggerFromTop** - The percentage from the top of the viewport when the background should trigger. A 1 means as it comes into view. 0.5 is in the middle of the screen.
* **speed** - Speed of cross disolve.

