$(function(){
    $( function(){
        $('.header__menu').each(function () {
            mobileMenu($(this));
        });
        $('.sub-menu').each(function () {
            subMenu($(this));
        });
        $('.map').each(function () {
            new Map($(this));
        });
        $.each($('.tabs'), function () {
            new Tabs( $( this ) );
        });
    } );

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

    var Map = function (obj) {

        this.obj = obj;
        this.mapWrap = this.obj.find(".map__canvas");
        //private properties

        var _self = this,
            _marker = [],
            _data = JSON.parse(_self.mapWrap.attr('data-map')).marks,
            _zoom = JSON.parse(_self.mapWrap.attr('data-map')).zoom;

        //private methods
        var _addEvents = function () {

                google.maps.event.addDomListener(window, 'load', _initialize);

            },
            _initialize = function () {

                var mapOptions = {
                    zoom: _zoom,
                    center:  new google.maps.LatLng(_data[0].poi_latitude, _data[0].poi_longitude),
                    scrollwheel: false
                };

                var map = new google.maps.Map(_self.mapWrap[0], mapOptions);

                _setMarkers(map);
            },
            _setMarkers = function (map) {
                var image = {
                    url: 'img/marker-icon.png',
                    size: new google.maps.Size(23, 26),
                    origin: new google.maps.Point(-2, 0),
                    anchor: new google.maps.Point(0, 40)
                };

                $.each(_data, function (i) {
                    var curLatLng = new google.maps.LatLng(this.poi_latitude, this.poi_longitude);

                    _marker[ i ] = new google.maps.Marker({
                        position: curLatLng,
                        map: map,
                        icon: image
                    });

                });

            },

            _init = function () {
                _addEvents();
            };
        _init();
    };

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
    
    
});
