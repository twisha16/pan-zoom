(function(window, document) {

  //Fetch the elements
  var cntr = document.getElementsByClassName('container')[0];
  var zoomInBtn = document.getElementsByClassName('zoom-in-btn')[0];
  var zoomOutBtn = document.getElementsByClassName('zoom-out-btn')[0];
  var zoomImg = document.getElementsByClassName('zoom-img')[0];

  //Initialize state
  var isZoomedIn = false; //Is Currently Zoomed in
  var isPanning = false; //Is Panning and Zooming
  var startX, startY, currentX, currentY, endX, endY;

  //Attach Event listeners

  //Zoom in and out on clicking the image.
  zoomImg.addEventListener('click', e => {
    if (isZoomedIn) {
      cntr.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
      isZoomedIn = false;
    } else {
      cntr.style.transform = 'matrix(3, 0, 0, 3, 0, 0)';
      isZoomedIn = true;
    }
  });

  //Zoom toggle based on the buttons
  zoomInBtn.addEventListener('click', e => {
    cntr.style.transform = 'matrix(3, 0, 0, 3, 0, 0)';
  });
  zoomOutBtn.addEventListener('click', e => {
    cntr.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
  });

  //Captrure the coo-dinates when the Drag starts
  function onDragStart(e) {
    startX = e.clientX;
    startY = e.clientY;
  }

  //Calculate the x and y for translate when the mouse drags
  function getUpdatedTranslate(moveX, moveY) {
    var transform = window.getComputedStyle(cntr, null).getPropertyValue('transform');
    var list = transform.substring(7, transform.length - 1).split(',');
    x = parseInt(list[4].trim());
    y = parseInt(list[5].trim());
    if (moveX) {
      x = moveX + x;
    }
    if (moveY) {
      y = moveY + y;
    }
    return `matrix(3, 0, 0, 3, ${x}, ${y})`;
  }

  function onDrag(e) {
    if (currentX === undefined) {
      currentX = startX;
    }
    if (currentY === undefined) {
      currentY = startY;
    }
    //Need this check because of an issue where the last x,y that onDrag returns is 0,0
    if (!(e.clientX === 0 && e.clientY === 0)) {
      var moveX = e.clientX - currentX;
      var moveY = e.clientY - currentY;
      currentX = e.clientX;
      currentY = e.clientY;
      var update = getUpdatedTranslate(moveX, moveY);
      cntr.style.transform = update;
    }
  }

  cntr.addEventListener('dragstart', onDragStart);
  cntr.addEventListener('drag', onDrag);
})(window, document);
