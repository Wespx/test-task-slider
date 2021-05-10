"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var i,s=_getPrototypeOf(e);if(t){var n=_getPrototypeOf(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return _possibleConstructorReturn(this,i)}}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var sliders=function(){var e=document.getElementById("js-main-slider"),t=document.getElementById("js-main-slider-slides"),i=document.getElementById("js-main-slider-bullets"),s=document.querySelectorAll(".main-slider__slide"),n=document.getElementById("js-secondary-slider"),r=document.getElementById("js-secondary-slider-slides"),o=document.querySelectorAll(".secondary-slider__slide"),l=document.getElementById("js-secondary-slider-range"),a=function(){function t(e,i,s,n,r){_classCallCheck(this,t),this.direction="vertical"===r?"Y":"X",this.slider=e,this.slideList=i,this.slides=s,this.pagination=n,this.slideHeight=s[0].offsetHeight,this.slideWidth=s[0].offsetWidth,this.slideSize="Y"===this.direction?this.slideHeight:this.slideWidth,this.slideSpeedIndex=.1,this.slideIndex=0,this.posInit=0,this.pos1=0,this.pos2=0,this.posFinal=0,this.regExp=/[-0-9.]+(?=px)/,this.swipeMoveBound=this.swipeMove.bind(this)}return _createClass(t,[{key:"getEvent",value:function(e){return-1!==e.type.search("touch")?e.targetTouches[0]:e}},{key:"showHideScrollDown",value:function(){var e=document.getElementById("js-scroll-down");e&&(0!==this.slideIndex?e.style.display="none":e.style.display="block")}},{key:"moveToSlide",value:function(){this.slideList.style.transition="transform .5s ease",this.slideList.style.transform="translate".concat(this.direction,"(-").concat(this.slideIndex*this.slideSize,"px)")}},{key:"swipeEnd",value:function(){this.posFinal=this.posInit-this.pos1,e.removeEventListener("touchmove",this.swipeMoveBound),e.removeEventListener("mousemove",this.swipeMoveBound),Math.abs(this.posFinal)>this.slideSize*this.slideSpeedIndex&&(this.posInit<this.pos1?this.slideIndex--:this.posInit>this.pos1&&this.slideIndex++),this.slideIndex<0?this.slideIndex=0:this.slideIndex>this.slides.length-1&&(this.slideIndex=this.slides.length-1),this.showHideScrollDown(),this.moveToSlide(),this.changeBulletsActive()}},{key:"swipeMove",value:function(e){var t=this.slideList.style.transform.match(this.regExp)[0];t>50||t<-this.slideSize*(this.slides.length-1)-50?this.moveToSlide():(this.pos2="Y"===this.direction?this.pos1-this.getEvent(e).clientY:this.pos1-this.getEvent(e).clientX,this.pos1="Y"===this.direction?this.getEvent(e).clientY:this.getEvent(e).clientX,this.slideList.style.transform="translate".concat(this.direction,"(").concat(t-this.pos2,"px)"))}},{key:"swipeStart",value:function(t){"INPUT"!==t.target.tagName&&"BUTTON"!==t.target.tagName&&(this.slideList.style.transition="",this.posInit="Y"===this.direction?this.getEvent(t).clientY:this.getEvent(t).clientX,this.pos1=this.posInit,e.addEventListener("touchmove",this.swipeMoveBound),e.addEventListener("mousemove",this.swipeMoveBound))}},{key:"changeBulletsActive",value:function(){var e=this.pagination.querySelector(".bullet_active"),t=this.pagination.querySelectorAll(".bullet")[this.slideIndex];e.classList.remove("bullet_active"),t.classList.add("bullet_active")}},{key:"handleBulletsClick",value:function(e){if(e.target.classList.contains("bullet")&&!e.target.classList.contains("bullet_active")){var t=Array.prototype.indexOf.call(this.pagination.children,e.target);this.slideIndex=t,this.changeBulletsActive(),this.moveToSlide()}}},{key:"init",value:function(){this.slideList.style.transform="translate".concat(this.direction,"(0px)"),this.slider.addEventListener("touchstart",this.swipeStart.bind(this)),this.slider.addEventListener("touchend",this.swipeEnd.bind(this)),this.slider.addEventListener("mousedown",this.swipeStart.bind(this)),this.slider.addEventListener("mouseup",this.swipeEnd.bind(this)),this.pagination.addEventListener("click",this.handleBulletsClick.bind(this))}}]),t}(),h=function(e){_inherits(i,e);var t=_createSuper(i);function i(e,s,n,r){var o;return _classCallCheck(this,i),(o=t.call(this,e,s,n)).range=r,o.rangeValue=0,o.rangeValueEnd=0,o}return _createClass(i,[{key:"rangeProgressBarFill",value:function(){this.range.style.background="\n                linear-gradient(to right, #fff 0%, #fff ".concat(this.rangeValue,"%,\n                #435063 ").concat(this.rangeValue,"%, #435063 100%)")}},{key:"rangeChange",value:function(e){var t,i=this,s=parseInt(e.target.value),n=50*this.slideIndex,r=n-s<0?-1:1;l.setAttribute("disabled",!0),function s(){parseInt(e.target.value)!==n?t=requestAnimationFrame(s):(cancelAnimationFrame(t),l.removeAttribute("disabled")),e.target.value=parseInt(e.target.value)+r,i.rangeValue=e.target.value,i.rangeProgressBarFill()}()}},{key:"rangeMove",value:function(e){this.rangeValue=e.target.value,this.rangeProgressBarFill(),this.rangeValue<=25&&this.rangeValueEnd>this.rangeValue?(this.slideIndex=0,this.rangeValueEnd=0,this.moveToSlide()):this.rangeValue>=75&&this.rangeValueEnd<this.rangeValue?(this.slideIndex=2,this.rangeValueEnd=100,this.moveToSlide()):this.rangeValue>25&&this.rangeValue<75&&50!==this.rangeValueEnd&&(this.slideIndex=1,this.rangeValueEnd=50,this.moveToSlide())}},{key:"rangeInit",value:function(){this.range.addEventListener("input",this.rangeMove.bind(this)),this.range.addEventListener("change",this.rangeChange.bind(this))}}]),i}(a),c=new a(e,t,s,i,"vertical"),d=new h(n,r,o,l);c.init(),d.rangeInit()};sliders();