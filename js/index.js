'use strict';

const sliders = () => {
    const mainSlider = document.getElementById('js-main-slider');
    const mainSliderSlideList = document.getElementById('js-main-slider-slides');
    const bullets = document.getElementById('js-main-slider-bullets');
    const mainSliderSlides = document.querySelectorAll('.main-slider__slide');
    const secondarySlider = document.getElementById('js-secondary-slider');
    const secondarySliderSlideList = document.getElementById('js-secondary-slider-slides');
    const secondarySliderSlides = document.querySelectorAll('.secondary-slider__slide');
    const range = document.getElementById('js-secondary-slider-range');

    class SwipeSlider {
        constructor(slider, slideList, slides, pagination, direction) {
            this.direction = direction === 'vertical' ? 'Y' : 'X';
            this.slider = slider;
            this.slideList = slideList;
            this.slides = slides;
            this.pagination = pagination;
            this.slideHeight = slides[0].offsetHeight;
            this.slideWidth = slides[0].offsetWidth;
            this.slideSize = this.direction === 'Y' ? this.slideHeight : this.slideWidth;
            this.slideSpeedIndex = 0.1;
            this.slideIndex = 0;
            this.posInit = 0; 
            this.pos1 = 0;
            this.pos2 = 0;
            this.posFinal = 0;
            this.regExp = /[-0-9.]+(?=px)/;
            this.swipeMoveBound = this.swipeMove.bind(this);
        }

        getEvent(e) {
            return e.type.search('touch') !== -1 ? e.targetTouches[0] : e;
        }

        showHideScrollDown() {
            const scrollDown = document.getElementById('js-scroll-down');

            if (scrollDown) {
                if (this.slideIndex !== 0) {
                    scrollDown.style.display = 'none';
                } else {
                    scrollDown.style.display = 'block';
                }
            }
        }

        moveToSlide() {
            this.slideList.style.transition = 'transform .5s ease';
            this.slideList.style.transform = `translate${this.direction}(-${this.slideIndex * this.slideSize}px)`;
        }

        swipeEnd() {
            this.posFinal = this.posInit - this.pos1;
            mainSlider.removeEventListener('touchmove', this.swipeMoveBound);
            mainSlider.removeEventListener('mousemove', this.swipeMoveBound);
            
            if (Math.abs(this.posFinal) > this.slideSize * this.slideSpeedIndex) {
                if (this.posInit < this.pos1) {
                this.slideIndex--;
                } else if (this.posInit > this.pos1) { 
                this.slideIndex++;
                }
            }

            if (this.slideIndex < 0) {
                this.slideIndex = 0;
            } else if (this.slideIndex > this.slides.length - 1) {
                this.slideIndex = this.slides.length - 1;
            }

            this.showHideScrollDown();
            this.moveToSlide();
            this.changeBulletsActive();
        }

        swipeMove(e) {
            //текущее значение transform обертки слайдов
            const transform = this.slideList.style.transform.match(this.regExp)[0];
        
            //предотвращение скролла, превышающего размеры обертки слайдов
            if (transform > 50 || transform < -(this.slideSize * (this.slides.length - 1)) - 50) {
                this.moveToSlide();
                return;
            }
        
            this.pos2 = this.direction === 'Y' ? this.pos1 - this.getEvent(e).clientY : this.pos1 - this.getEvent(e).clientX;
            this.pos1 = this.direction === 'Y' ? this.getEvent(e).clientY : this.getEvent(e).clientX;
        
            this.slideList.style.transform = `translate${this.direction}(${transform - this.pos2}px)`;
        }

        swipeStart(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
            
            this.slideList.style.transition = '';
            this.posInit = this.direction === 'Y' ? this.getEvent(e).clientY : this.getEvent(e).clientX;
            this.pos1 = this.posInit;

            mainSlider.addEventListener('touchmove', this.swipeMoveBound);
            mainSlider.addEventListener('mousemove', this.swipeMoveBound);
        }

        changeBulletsActive() {
            const prevActive = this.pagination.querySelector('.bullet_active');
            const newActive = this.pagination.querySelectorAll('.bullet')[this.slideIndex];

            prevActive.classList.remove('bullet_active');
            newActive.classList.add('bullet_active');
        }

        handleBulletsClick(e) {
            if (e.target.classList.contains('bullet') && !e.target.classList.contains('bullet_active')) {
                const indexBullet = Array.prototype.indexOf.call(this.pagination.children, e.target);
                //получаем индекс кнопки, на которую кликнули

                this.slideIndex = indexBullet;
                this.changeBulletsActive();
                this.moveToSlide();
            }   
        }

        init() {
            this.slideList.style.transform = `translate${this.direction}(0px)`;

            this.slider.addEventListener('touchstart', this.swipeStart.bind(this));
            this.slider.addEventListener('touchend', this.swipeEnd.bind(this));
            this.slider.addEventListener('mousedown', this.swipeStart.bind(this));
            this.slider.addEventListener('mouseup', this.swipeEnd.bind(this));
            this.pagination.addEventListener('click', this.handleBulletsClick.bind(this))
        }
    }

    class RangeSlider extends SwipeSlider {
        constructor(slider, slideList, slides, range) {
            super(slider, slideList, slides);
            this.range = range;
            this.rangeValue = 0;
            this.rangeValueEnd = 0;
        }

        rangeProgressBarFill() {
            this.range.style.background = `
                linear-gradient(to right, #fff 0%, #fff ${this.rangeValue}%,
                #435063 ${this.rangeValue}%, #435063 100%)`;
        }

        rangeChange(e) {
            //при окончании перемещения ползунка пользователем данный метод
            //плавно перемещает ползунок к ближайшему значению
            const endValue = parseInt(e.target.value);
            const targetValue = this.slideIndex * 50;
            const i = targetValue - endValue < 0 ? -1 : 1;
            let requestId;

            const step = () => {
                if (parseInt(e.target.value) !== targetValue) {
                    requestId = requestAnimationFrame(step);
                } else {
                    cancelAnimationFrame(requestId);
                    range.removeAttribute('disabled');
                }

                e.target.value = parseInt(e.target.value) + i;
                this.rangeValue = e.target.value;
                this.rangeProgressBarFill();
            };

            range.setAttribute('disabled', true); //для предотвращения бага анимации ползунка
            step();
        }
        
        rangeMove(e) {
            this.rangeValue = e.target.value;
            this.rangeProgressBarFill();

            if (this.rangeValue <= 25 && this.rangeValueEnd > this.rangeValue) {
                this.slideIndex = 0;
                this.rangeValueEnd = 0;
                this.moveToSlide();
            } else if (this.rangeValue >= 75 && this.rangeValueEnd < this.rangeValue) {
                this.slideIndex = 2;
                this.rangeValueEnd = 100;
                this.moveToSlide();
            } else if (this.rangeValue > 25 && this.rangeValue < 75 && this.rangeValueEnd !== 50) {
                this.slideIndex = 1;
                this.rangeValueEnd = 50;
                this.moveToSlide();
            }
        }

        rangeInit() {
            this.range.addEventListener('input', this.rangeMove.bind(this));
            this.range.addEventListener('change', this.rangeChange.bind(this));
        }
    }

    const fistSlider = new SwipeSlider(mainSlider, mainSliderSlideList, mainSliderSlides, bullets, 'vertical');
    const secondSlider = new RangeSlider(secondarySlider, secondarySliderSlideList, secondarySliderSlides, range);
    fistSlider.init();
    secondSlider.rangeInit();
};

sliders();