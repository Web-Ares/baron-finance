$(function(){
    $( function(){
        $('.header__menu').each(function () {
            mobileMenu($(this));
        });
        $('.sub-menu').each(function () {
            subMenu($(this));
        });
    } );


var mobileMenu = function (obj) {
    //private properties
    var _obj = obj,
        _head = $('.site__header-layout'),
        _openBtn = $('.open-menu'),
        _closeBtn = $('.close-menu'),
        _site = $('.site'),
        _window = $(window);

    //private methods
    var _addEvents = function () {

            _window.on({
                resize: function () {

                    var windowWidth = _window.width();

                    if(windowWidth<=1024){
                        _obj.slideUp(300);
                        _head.removeClass('mobile-menu');
                        _openBtn.removeClass('close-menu');
                    } else {
                        _obj.css('display','block');
                    }

                }
            });

            _openBtn.on({
                click: function () {
                    if (_openBtn.hasClass('close-menu')){
                        _obj.slideUp(500);
                        _openBtn.removeClass('close-menu');
                        _head.removeClass('mobile-menu');
                    } else {
                        _obj.slideDown(500);
                        _openBtn.addClass('close-menu');
                        _head.addClass('mobile-menu');
                    }
                }
            });
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};

var subMenu = function (obj) {
    //private properties
    var _obj = obj,
        _site = $('.site'),
        _btn = obj.parent('li'),
        _window = $(window);

    //private methods
    var _addEvents = function () {

            _window.on({
                resize: function () {

                    var windowWidth = _window.width();

                    if(windowWidth<=1024){
                        $('.header__menu li').removeClass('active');
                        $('.header__menu li ul').css('display','none');
                    }
                    else{
                        $('.header__menu li').removeClass('active');
                        $('.header__menu li ul').css('display','block');
                    }

                }
            });

            _btn.on({
                click: function () {

                    var windowWidth = _window.width();

                    if(windowWidth<=1024) {
                        if (_btn.hasClass('active')) {
                            _obj.slideUp(500);
                            _btn.removeClass('active');
                        } else {
                            $('.header__menu li').removeClass('active');
                            $('.header__menu li ul').slideUp(500);
                            $(this).addClass('active');
                            _obj.slideDown(500);
                        }
                        return false
                    }

                }
            });
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};
});