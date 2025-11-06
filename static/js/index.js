window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

// Custom carousel functionality for Modern T2I and T2V Architectures
let currentSlides = {
  'modern-t2i': 0,
  'modern-t2v': 0
};

function changeSlide(direction, carouselId) {
  // Get slides and indicators for the specific carousel
  let slides, indicators;
  
  if (carouselId === 'modern-t2i') {
    slides = document.querySelectorAll(`[data-slide]:not([data-carousel="t2v"])`);
    indicators = document.querySelectorAll('.carousel-container:first-of-type .indicator');
  } else if (carouselId === 'modern-t2v') {
    slides = document.querySelectorAll(`[data-carousel="t2v"]`);
    indicators = document.querySelectorAll('.carousel-container:last-of-type .indicator');
  }
  
  // Hide current slide
  slides[currentSlides[carouselId]].style.display = 'none';
  indicators[currentSlides[carouselId]].classList.remove('active');
  indicators[currentSlides[carouselId]].style.background = '#ccc';
  
  // Calculate next slide
  currentSlides[carouselId] += direction;
  if (currentSlides[carouselId] >= slides.length) {
    currentSlides[carouselId] = 0;
  } else if (currentSlides[carouselId] < 0) {
    currentSlides[carouselId] = slides.length - 1;
  }
  
  // Show new slide
  slides[currentSlides[carouselId]].style.display = 'block';
  indicators[currentSlides[carouselId]].classList.add('active');
  indicators[currentSlides[carouselId]].style.background = '#333';
}

function goToSlide(slideIndex, carouselId) {
  // Get slides and indicators for the specific carousel
  let slides, indicators;
  
  if (carouselId === 'modern-t2i') {
    slides = document.querySelectorAll(`[data-slide]:not([data-carousel="t2v"])`);
    indicators = document.querySelectorAll('.carousel-container:first-of-type .indicator');
  } else if (carouselId === 'modern-t2v') {
    slides = document.querySelectorAll(`[data-carousel="t2v"]`);
    indicators = document.querySelectorAll('.carousel-container:last-of-type .indicator');
  }
  
  // Hide current slide
  slides[currentSlides[carouselId]].style.display = 'none';
  indicators[currentSlides[carouselId]].classList.remove('active');
  indicators[currentSlides[carouselId]].style.background = '#ccc';
  
  // Show selected slide
  currentSlides[carouselId] = slideIndex;
  slides[currentSlides[carouselId]].style.display = 'block';
  indicators[currentSlides[carouselId]].classList.add('active');
  indicators[currentSlides[carouselId]].style.background = '#333';
}
