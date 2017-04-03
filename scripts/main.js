var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY  = 27;

//Will change the detail image and the detail image title
function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

//get the image and the title from a thumbnail
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

//accept a thumbnail element reference and return the title text
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

//will call 3 previous functions together
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

//
function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click', function(event){
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

//Access all items from thumbnail not just one and convert from node to array
function getThumbnailsArray(){
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}
//add a class name to the body element
function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
//making the detial image visible again
function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}
//Listens for a keyup event to hide the detail image to hideDetails
function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event){
    event.preventDefault();
    console.log(event.keyCode);
    if(event.keyCode === ESC_KEY){
      hideDetails();
    }
  });
}

//tie together all elements
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
