$(function(){
    $( function(){

        $('.header__menu').each(function () {
            mobileMenu($(this));
        });

        $('.sub-menu').each(function () {
            subMenu($(this));
        });

        $.each($('.tabs'), function () {
            new Tabs( $( this ) );
        });


    } );


    var mobileMenu = function (obj) {
        //private properties
        var _obj = obj,
            _head = $('.site__header-layout'),
            _openBtn = $('.open-menu'),
            _closeBtn = $('.close-menu'),
            _site = $('.site'),
            _window = $(window),
            _windowWidth = $(window).width();

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
            _window = $(window),
            _windowWidth = $(window).width();

        //private methods
        var _addEvents = function () {

                _windowWidth = $(window).width();

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
                        if (_btn.hasClass('active')){
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

    var Tabs = function (obj) {

        var _obj = obj,
            _window = $(window),
            _body = $("body"),
            _tabBtn = _obj.find('.tabs__controls-wrap > div'),
            _tabBtnInner = _tabBtn.find('> span'),
            _tabContent = _obj.find('.tabs__wrapper'),
            _controls = _obj.find('.tabs__controls-wrap'),
            _tabContentItem = _tabContent.find('> div');

        var _addEvents = function () {

                _window.on({
                    'load': function(){
                        _showContentWhenLoading();
                    }
                });

                _tabBtnInner.on({
                    mousedown: function(){
                        _tabContent.css({
                            'height': _tabContent.innerHeight()
                        }, 300);
                    },
                    mouseup: function(){
                        var curItem = $(this),
                            parent = curItem.parent(),
                            index = parent.index();
                        var activeContent = _tabContentItem.eq(index),
                            activeContentHeight = activeContent.innerHeight();
                        _tabContent.animate({
                            'height': activeContentHeight
                        }, 300);
                        setTimeout(function(){
                            _tabContent.css({
                                "height": ""
                            });
                        },400)
                    },
                    click: function(){
                        var curItem = $(this),
                            parent = curItem.parent(),
                            index = parent.index();
                        _tabBtn.removeClass("active");
                        _tabBtn.eq(index).addClass("active");
                        _showContent(index);
                        _controls.removeClass("active");
                    }
                });

                _body.on({
                    click: function(){
                        _controls.removeClass("active");
                    }
                });

            },
            _showContentWhenLoading = function(){
                var index = _tabBtn.filter('.active').index();
                if ( index == "-1" ){
                    index = 0;
                    _tabBtn.eq(index).addClass("active");
                }
                _showContent(index);
            },
            _showContent = function(i){
                var activeContent = _tabContentItem.eq(i);
                _tabContentItem.css({
                    "display": "none"
                });
                activeContent.css({
                    "display": "block"
                });
            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

});