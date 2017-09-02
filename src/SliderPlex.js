(function ($) {
    $.fn.SliderPlex = function (userOptions) {

        var options = {
            time: 8,
            transition: 'fade',
            arrows: true
        };

        $.extend(options, userOptions);
        
        var $plex = $(this);
        var $plex_slides = $plex.children();

        console.log($plex);

        setSliderClass();
        setSliderContentClass();
        
        function setSliderClass() {
            $plex.addClass('slider-plex');
        }
        function setSliderContentClass() {
            $plex_slides.addClass('plex-slides');
        }

        return $plex;
    }
})(jQuery);

/*
$(function () {
    $('.umburg').click(function () {
        $(this).toggleClass('cross');
    });


    var sliderContents = $('.slider ul li');
    var cycle;

    function initSlider() {
        setZIndexes();

        startNewCycle(8, slideRight);
    }

    function setZIndexes() {

        sliderContents
            .first()
            .addClass('active')
            .next()
            .addClass('next');

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
            .removeClass('next')
            .addClass('active');
    }

    /!**
     * Activa (apresenta) o slide anterior
     *!/
    function activePrevSlide() {
        prevSlide()
            .removeClass('prev')
            .addClass('active');
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
            nextSlide.addClass('next');
        else
            sliderContents
                .first()
                .addClass('next');
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
