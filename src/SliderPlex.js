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
        interval: 8,
        autoPlay: true,
        transition: 'fade',
        transitionTime: .5,
        direction: 'right',
        arrows: true,
        nonFocusArrows: false,
        pauseOnMouseOver: false,
        pauseOnMouseDown: true,
        fillHeight: false
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

            if($options.fillHeight)
                fillHeight();

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

            /*
             * If autoPlay is enabled, when the user clicks
             * in an arrow the play slide cycle is restarted
             */
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
        function fillHeight() {
            $plex_slides_container.addClass('full-height');
        }

        /** Starts the slide cyle */
        function play() {
            if($cycle)
                clearInterval($cycle);

            // Just for code reuse
            var setInt = function (callback) {
                $cycle = setInterval(callback, getInterval());
            };

            if(directionToRight())
                setInt(slideRight);
            else
                setInt(slideLeft);
        }

        /** Gets the slides transition interval */
        function getTransitionTime () {
            return $options.transitionTime * 1000;
        }

        /** Retuns true if the slider direction is to right, false otherwise (left) */
        function directionToRight () {
            return $options.direction === 'right';
        }

        /** Gets the interval interval to changes between slides */
        function getInterval() {
            return $options.interval * 1000;
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
            if($index === getLastIndex())
                $index = 0;
            else
                $index++;
        }

        /** Decrement the current slide position */
        function decrement() {
            if($index === 0)
                $index = getLastIndex();
            else
                $index--;
        }

        /** Initialize the slide */
        init();

        return $plex;
    }
})(jQuery);