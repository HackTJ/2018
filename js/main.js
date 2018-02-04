var logos = "img/logos/";
var partnerlogos = "img/logos2/";
// var smalllogos = "img/sponsor-logos-small/";

addImages();
setupNav();

// window.location.reload(true)
// Helpers
function setupNav(){
  var Sticky = new hcSticky('nav', {
    stickTo: 'navcontainer'
  });
}
function addImages(){
  var sponsordivs = document.getElementsByClassName("partner-container");
  var str = "";
  for(s in sponsorImages){
    str += "<a href= 'http://" + sponsorImages[s][1] + "' target='_blank'>";
    str += "<img src='"+ logos + sponsorImages[s][0] +"'></img>";
    str += "</a>";
  }
  sponsordivs[0].innerHTML = str;
  str = "";
  for(s in partnerImages){
    str += "<a href= 'http://" + partnerImages[s][1] + "' target='_blank'>";
    str += "<img src='"+ partnerlogos + partnerImages[s][0] +"'></img>";
    str += "</a>";
  }
  sponsordivs[1].innerHTML = str;
}
function hasClass(el, className) {
  if (!el) return false;
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
function addClass(el, className) {
  if (!el) return false;
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
  return true;
}
function removeClass(el, className) {
  if (!el) return false;
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
  return false;
}
function toggleClass(el, className) {
  if ( hasClass(el, className) )
    return removeClass(el, className);
  else 
    return addClass(el, className);
}
function getParentWithClass(el, className) {
  var parent = el.parentElement;
  while(parent != null && !parent.classList.contains(className))
    parent = parent.parentElement;
  return parent;
}
function getSiblingWithClass(el, className) {
  var sibling = el.nextElementSibling;
  while(sibling != null && !sibling.classList.contains(className))
    sibling = sibling.nextElementSibling;
  return sibling;
}
function getChildWithClass(el, className) {
  var children = el.childNodes;
  for(var i=0; i<children.length; i++)
    if(children[i].classList && children[i].classList.contains(className)) return children[i];
}

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
{
  function setButtonListeners(container){
    document.querySelector(container+" .register-button.student")
    .addEventListener("click", function(evt){
      window.location = "https://nvite.com/HackTJ/hacktjstudents/tickets"
    });
    document.querySelector(container+" .register-button.mentor")
    .addEventListener("click", function(evt){
      window.location = "https://nvite.com/HackTJ/hacktjmentorvolunteers/tickets"
    });
  }
  setButtonListeners(".register-button-block.top")
  setButtonListeners(".register-button-block.bottom")
}


var isMobile = (window.innerWidth < 640);

var openQuestion = function(group, question, answer, tween){
  return function(e){
    var isOpen = toggleClass(group, 'is-open');
    var transitions = {};
    if(isOpen){
      transitions.height = answer.getAttribute('data-height');
      transitions.ease = Power2.easeOut;
    } else {
      transitions.height = 0;
      transitions.ease = Power2.easeOut;
    }
    console.log('tween', TweenMax.to);
    TweenMax.to(answer, 0.5, transitions);
  }
}
var questions = document.querySelectorAll('.question-group .question');
for(var i=0; i<questions.length; i++){
  var group = getParentWithClass(questions[i], 'question-group');
  var answer = getSiblingWithClass(questions[i], 'answer');
  answer.setAttribute("data-height", answer.clientHeight);
  answer.style.height = "0";
  group.addEventListener("click", openQuestion(group, questions[i], answer))
}

function initializeMap() {
  var hacktjStyle = new google.maps.StyledMapType(window.hacktjMapStyles, {name: "HackTJ Website"});
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: isMobile ? {lat: 38.819, lng: -77.189} : {lat: 38.819, lng: -77.209},
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
  });
  map.mapTypes.set('hacktj', hacktjStyle);
  map.setMapTypeId('hacktj');

  var marker = new google.maps.Marker({
    position: {lat: 38.818086, lng: -77.168323},
    map: map
  });
}
google.maps.event.addDomListener(window, 'load', initializeMap);

// ScrollMagic Code
if(!isMobile){
  var scrollController = new ScrollMagic.Controller();
  var segments = document.querySelectorAll('.animation-container');
  var scrollDistance = 0;
  var animations = [];
  for (i = 0; i < segments.length; ++i) {
    if(hasClass(segments[i], 'vertical')){
      scrollDistance += segments[i].clientHeight;
    } else if(hasClass(segments[i], 'horizontal')){
      scrollDistance += segments[i].clientWidth;
    }
    animations.push(segments[i]);
  }
  var totalHeight = ((document.height !== undefined) ? document.height : document.body.offsetHeight) - window.innerHeight;
  var scrollFactor = totalHeight / scrollDistance;

  var y = window.innerHeight/2.5;
  animations.forEach(function(segment){
    if( segment.childNodes[0] && !hasClass(segment, 'line-schedule')) {
      var child = segment.childNodes[0];
      var animateDuration = 0;
      var animations = {ease: Linear.easeNone};
      if(hasClass(segment, 'vertical')){ 
        animations.height = "100%"; 
        animateDuration = segment.clientHeight * 1.3;
      }
      if(hasClass(segment, 'horizontal')){ 
        animations.width = "100%"; 
        animateDuration = segment.clientWidth / 2.0;
      }
      animateDuration = animateDuration * scrollFactor;
      
      var scene = new ScrollMagic.Scene({offset: y, duration: animateDuration})
        .setTween(segment.childNodes[0], animations)
        .addTo(scrollController);

      y = y + animateDuration;
    } else if(hasClass(segment, 'line-schedule')) {
      var scene = new ScrollMagic.Scene({triggerElement: segment, offset: -segment.clientWidth/2, duration: segment.clientWidth})
        .setTween(segment.childNodes[0], {width: "100%"})
        // .addIndicators({name: "Y: "+segment.offsetY+" Duration: "+segment.clientWidth})
        .addTo(scrollController);

    }
  });
  var scene = new ScrollMagic.Scene({offset: y, duration: totalHeight-y})
        .setTween('#map-info', {transform: "scale(1)"})
        .addTo(scrollController)
        .on('end', function(){
          scrollController.destroy();
        });
}

function setImages(count){
  var doneImages = [];
  setTimeout(function(){
    var popups = document.getElementsByClassName("nvite-card-name");
    var images = Array.prototype.map.call(popups, function(popup){
      if(doneImages.indexOf(popup.textContent) == -1){
        var img = Array.prototype.filter.call(popup.parentNode.childNodes, function(sibling){
          return sibling.nodeName === 'IMG';
        })[0];
        img.setAttribute('src', sponsorSmallImages[popup.textContent]);
        doneImages.push(popup.textContent);
      }
      return img;
    });
    if(doneImages.length < Object.keys(sponsorSmallImages).length  && count < 10){
      setImages(count+1);
    }
  }, 500);
}
// setImages(0);