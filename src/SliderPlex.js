(function ($) {
    var $plex,
        $plex_slides_container,
        $plex_slides,
        $cycle,
        $active = 'active',
        $new = 'new',
        $old = 'old',
        $slider_plex = '.slider-plex',
        $arrow = '.arrow',
        $index = 0,
        $slides_length,
        $isPaused = false,

        $options = {
            slideInterval: 8,
            autoPlay: true,
            animation: 'fade',
            animationTime: .5,
            direction: 'right',
            arrows: true,
            nonFocusArrows: false,
            pauseOnMouseOver: false,
            pauseOnMouseDown: true,
            fillSpace: false
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
            $plex_slides_container.addClass('slides');

            /** Setting the number of slides */
            $slides_length = $plex_slides.length;

            activeFirstSlide();
            setAnimation();

            if($options.arrows)
                initArrows();

            if($options.fillSpace)
                fillSpace();

            if($options.pauseOnMouseOver)
                pauseOnMouseOver();

            if($options.pauseOnMouseDown)
                pauseOnMouseDown();

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
                $($arrow).on('click', function (e) {
                    e.preventDefault();

                    play();
                });

            $($arrow + '-right').on('click', function (e) {
                e.preventDefault();

                slideRight();
            });
            $($arrow + '-left').on('click', function (e) {
                e.preventDefault();

                slideLeft();
            });
        }

        function pauseOnMouseOver() {
            $($slider_plex)
                .on('mouseover', function () {
                    $isPaused = true
                })
                .on('mouseout', function () {
                    $isPaused = false
                });
        }

        function pauseOnMouseDown() {
            $($slider_plex)
                .on('mousedown', function () {
                    $isPaused = true
                })
                .on('mouseup', function () {
                    $isPaused = false
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
            $($arrow).addClass('non-focus');
        }

        /** Makes each slide fill the slider space */
        function fillSpace() {
            $plex_slides_container.addClass('full-height');
        }

        /**
         * Sets the slider animation
         */
        function setAnimation() {
            $('head').append(
                '<style>'
                + '.' + animationName() + ' .' + $old + ','
                + '.' + animationName() + ' .' + $new
                + ' {animation-duration:' + animationTime() + 'ms' + '}'
                +
                '</style>'
            );

            // Adds the animation class
            $plex_slides_container.addClass(animationName());
        }

        /** Starts the slide cycle */
        function play() {
            /* Stops a cycle before start a new one */
            if($cycle)
                clearInterval($cycle);

            // SetInterval - Just for code reuse
            var setInt = function (callback) {
                $cycle = setInterval(callback, slideInterval());
            };

            if(directionToRight())
                setInt(slideRight);
            else
                setInt(slideLeft);
        }

        /** Gets the slides animation slideInterval */
        function animationTime () {
            return $options.animationTime * 1000;
        }

        /** Retuns true if the slider direction is to right, false otherwise (left) */
        function directionToRight () {
            return $options.direction === 'right';
        }

        /** Gets the slideInterval slideInterval to changes between slides */
        function slideInterval() {
            return $options.slideInterval * 1000;
        }

        /**
         * Slides to the `next` slide
         *
         * @param next
         */
        function slideTo(next) {
            var $current = getCurrent();

            setOld($current);
            setNew(next);

            setTimeout(function () {
                inactive($current);
                active(next);

                unsetOld($current);
                unsetNew(next);
            }, animationTime());
        }

        /**
         * Sets a slide as .old (used by css for animations)
         *
         * @param slide
         */
        function setOld(slide) {
            slide.addClass($old);
        }

        /**
         * Unsets a slide as old (used by css for animations)
         *
         * @param slide
         */
        function unsetOld(slide) {
            slide.removeClass($old);
        }

        /**
         * Sets the new slide (used by css for animations)
         *
         * @param slide
         */
        function setNew(slide) {
            slide.addClass($new);
        }

        /**
         * Unsets the new slide (used by css for animations)
         *
         * @param slide
         */
        function unsetNew(slide) {
            slide.removeClass($new);
        }

        /** Brings the active slide to back (Invisible) */
        function inactive(slide) {
            slide.removeClass($active)
        }

        /** Brings the next slide to the front (Visible) */
        function active(slide) {
            slide.addClass($active);
        }

        /**
         * Checks is a cycle is paused
         *
         * @returns {boolean}
         */
        function isPaused() {
            return $isPaused;
        }

        /** Slides to the left */
        function slideLeft() {
            var $leftSlide = getLeft();

            if(!isPaused()) {
                slideTo($leftSlide);

                decrement();
            }
        }

        /** Slides to the right */
        function slideRight() {
            var $rightSlide = getRight();

            if(!isPaused()) {
                slideTo($rightSlide);

                increment();
            }
        }

        /** Gets the animation animation name */
        function animationName() {
            return $options.animation;
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
