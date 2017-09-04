(function ($) {
    var $plex,
        $plex_slides_container,
        $plex_slides,
        $cycle,
        $active = 'active',
        $next = 'next',
        $index = 0,
        $slides_length,

        $options = {
        time: 8,
        autoPlay: true,
        transition: 'fade',
        transitionTime: .5,
        direction: 'right',
        arrows: true,
        nonFocusArrows: false,
        pauseOnMouseOver: false,
        pauseOnMouseDown: true,
        fullHeight: true
    };

    $.fn.SliderPlex = function (userOptions) {

        /* Extends and override defaults $options with userOptions */
        $.extend($options, userOptions);

        /* Getting the HTML slider element */
        $plex = $(this);

        function init() {
            /** Getting the slides container (ul) */
            $plex_slides_container = $plex.find('> ul');

            /** Getting the slides */
            $plex_slides = $plex_slides_container.find('> li');

            /** Adding styles to the slider element */
            $plex.addClass('slider-plex');

            /** Adding styles to the slides container and also to each slide */
            $plex_slides_container.addClass('plex-slides');

            /** Setting the number of slides */
            $slides_length = $plex_slides.length;

            activeFirstSlide();

            if($options.arrows)
                initArrows();

            if($options.fullHeight)
                fullHeight();

            if($options.autoPlay)
                play();
        }

        /** Actives (sets as visible) the first slide */
        function activeFirstSlide() {
            getCurrent().addClass($active);
        }

        /** Sets the slider arrows and their respective events handler */
        function initArrows () {
            addArrows();

            if($options.nonFocusArrows)
                setArrowsAsNonFocus();

            if($options.autoPlay)
                $('.arrow').on('click', function (e) {
                    e.preventDefault();

                    play();
                });

            $('.arrow-right').on('click', function (e) {
                e.preventDefault();

                slideRight();
            });
            $('.arrow-left').on('click', function (e) {
                e.preventDefault();

                slideLeft();
            });
        }

        /** Adds slider arrows buttons to the slider */
        function addArrows() {
            $plex.append('<a href="#" class="arrow arrow-left"></a><a href="#" class="arrow arrow-right"></a>');
        }

        /**
         * Sets the arrows as "non focus", so they become transparent
         * and only gain focus on mouse over
         *
         * Useful to avoid distraction
         */
        function setArrowsAsNonFocus() {
            $('.arrow').addClass('non-focus');
        }

        /** Makes each slide fill the slider height */
        function fullHeight() {
            $plex_slides_container.addClass('full-height');
        }

        /** Starts the slide cyle */
        function play() {
            if($cycle)
                clearInterval($cycle);

            if(directionToRight())
                $cycle = setInterval(slideRight, getInterval());
            else
                $cycle = setInterval(slideLeft, getInterval());
        }

        /** Gets the slides transition time */
        function getTransitionTime () {
            return $options.transitionTime * 1000;
        }

        /** Retuns true if the slider direction is to right, false otherwise (left) */
        function directionToRight () {
            return $options.direction === 'right';
        }

        /** Gets the interval time to changes between slides */
        function getInterval() {
            return $options.time * 1000;
        }

        /**
         * Slides to the `next` slide
         *
         * @param next
         */
        function slideTo(next) {
            var $active = getCurrent();

            setNext(next);
            slideOut($active);

            setTimeout(function () {
                removeTransition($active);
                bringInBack($active);
                bringInFront(next);
            }, getTransitionTime());
        }

        /** Sets the next slide to be displayed */
        function setNext(next) {
            next.addClass($next);
        }
        
        /** Removes the transition animation class from the given slide */
        function removeTransition(slide) {
            slide.removeClass(transitionName());
        }

        /** Brings the active slide to back (Invisible) */
        function bringInBack(slide) {
            slide.removeClass($active);
        }

        /** Brings the next slide to the front (Visible) */
        function bringInFront(slide) {
            slide
                .removeClass($next)
                .addClass($active);
        }

        /** Slides to the left */
        function slideLeft() {
            var $leftSlide = getLeft();

            slideTo($leftSlide);

            decrement();
        }

        /** Slides to the right */
        function slideRight() {
            var $rightSlide = getRight();

            slideTo($rightSlide);

            increment();
        }

        /** Slide out the active slide */
        function slideOut(slide) {
            slide.addClass(transitionName());
        }

        /** Gets the transition animation name */
        function transitionName() {
            return $options.transition + 'Out';
        }

        /** Get a slide by index in the slides collection */
        function getSlide(index) {
            return $($plex_slides[index]);
        }

        /** Checks if a slide exists in the slides collection*/
        function hasSlide(index) {
            return $plex_slides.hasOwnProperty(index);
        }

        /** Gets the active slide */
        function getCurrent() {
            return getSlide($index);
        }

        /** Gets the left slide in relation to the active slide */
        function getLeft() {
            var $i = $index - 1;

            return hasSlide($i) ? getSlide($i) : getLast();
        }

        /** Gets the right slide in relation to the active slide */
        function getRight() {
            var $i = $index + 1;

            return hasSlide($i) ? getSlide($i) : getFirst();
        }

        /** Gets the first slide in the slides collection */
        function getFirst() {
            return getSlide(0);
        }

        /** Gets the last slide in the slides collection */
        function getLast() {
            return getSlide(getLastIndex());
        }

        /** Gets the last index of the slides collection */
        function getLastIndex() {
            return $slides_length - 1;
        }

        /** Increment the current slide position */
        function increment() {
            if($index === $slides_length - 1)
                $index = 0;
            else
                $index++;
        }

        /** Decrement the current slide position */
        function decrement() {
            if($index === 0)
                $index = $slides_length - 1;
            else
                $index--;
        }

        /** Initialize the slide */
        init();

        return $plex;
    }
})(jQuery);

/*
$(function () {


    var sliderContents = $('.slider ul li');
    var cycle;

    function initSlider() {
        setZIndexes();

        startNewCycle(8, slideRight);
    }

    function setZIndexes() {

        sliderContents
            .first()
            .addClass($active)
            .next()
            .addClass($next);

        sliderContents
            .last()
            .addClass('prev');
    }

    initSlider();

    $('.arrow-left').on('click', function () {
        slideLeft();
    });
    $('.arrow-right').on('click', function () {
        slideRight();
        startNewCycle(8, slideRight);
    });

    function startNewCycle(time, callback) {
        if(cycle)
            clearInterval(cycle);

        cycle = setInterval(callback, time * 1000);
    }

    function slideRight() {
        slideOutOldSlide();
        setTimeout(function () {
            removeClassesFromOldSlide();
            activeNextSlide();
            setNextSlide();
            setPrevSlide()
        }, 500);
    }
    function slideLeft() {
        slideOutOldSlide();

        setTimeout(function () {
            removeClassesFromOldSlide();
            activePrevSlide();
            setNextSlide();
            setPrevSlide()
        }, 500);
    }

    /!**
     * Retorna o slide apresentado actualmente
     *
     * @returns {*|jQuery|HTMLElement}
     *!/
    function activeSlide() {
        return $('.slider .active');
    }

    /!**
     * Retorna o slide a anteriro do corrente
     *
     * @returns {*|jQuery|HTMLElement}
     *!/
    function nextSlide() {
        return $('.slider .next');
    }

    /!**
     * Retorna o slide a seguir do corrente
     *
     * @returns {*|jQuery|HTMLElement}
     *!/
    function prevSlide() {
        return $('.slider .prev');
    }

    /!**
     * Activa a animação de retirada do slide anterior
     *!/
    function slideOutOldSlide() {
        activeSlide().addClass('out');
    }

    /!**
     * Remove as classes `.active .out` do slide anterior
     *!/
    function removeClassesFromOldSlide() {
        activeSlide().removeClass('active out');
    }

    /!**
     * Activa (apresenta) o próximo slide
     *!/
    function activeNextSlide() {
        nextSlide()
            .removeClass($next)
            .addClass($active);
    }

    /!**
     * Activa (apresenta) o slide anterior
     *!/
    function activePrevSlide() {
        prevSlide()
            .removeClass('prev')
            .addClass($active);
    }

    /!**
     * Define quem será o slide a ser apresentado a seguir
     *!/
    function setNextSlide() {
        var nextSlide = activeSlide().next();

        /!* Se haver um slide a seguir ao `.active`,
         * defina-o como `.next` se não, defina
         * o primeiro slide.
         *!/
        if(nextSlide.length)
            nextSlide.addClass($next);
        else
            sliderContents
                .first()
                .addClass($next);
    }

    /!**
     * Define quem será o slide a ser apresentado a seguir
     *!/
    function setPrevSlide() {
        var prevSlide = activeSlide().prev();

        /!* Se haver um slide a seguir ao `.active`,
         * defina-o como `.next` se não, defina
         * o primeiro slide.
         *!/
        if(prevSlide.length)
            prevSlide.addClass('prev');
        else
            sliderContents
                .last()
                .addClass('prev');
    }
});*/
