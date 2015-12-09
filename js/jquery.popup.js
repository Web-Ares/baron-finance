$(function(){

    $('.popup').each(function(){
        new Popup($(this));
    });

});

var Popup = function( obj ){
    this.popup = obj;
    this.btnShow =  $('.popup__open');
    this.btnClose = obj.find( '.popup__close, .popup__cancel' );
    this.wrap = obj.find($('.popup__wrap'));
    this.contents = obj.find($('.popup__content'));
    this.textInner = obj.find($('.popup__text-inner'));
    this.window = $( window );
    this.scrollConteiner = $( 'html' );
    this.timer = setTimeout( function(){},1 );

    this.init();
};
Popup.prototype = {
    init: function(){
        var self = this;
        self.core = self.core();
        self.core.build();
    },
    core: function (){
        var self = this;

        return {
            build: function (){
                self.core.controls();
            },
            centerWrap: function(){
                if ( self.window.height() - 80 - self.wrap.height() > 0 ) {
                    self.wrap.css({top: ( ( self.window.height() -80 )- self.wrap.height())/2});
                } else {
                    self.wrap.css({top: 0});
                }
            },
            controls: function(){
                self.window.on( {
                    resize: function(){
                        self.core.centerWrap();
                    }
                } );
                self.btnShow.on( {
                    click: function(){
                        self.textInner.html("");
                        var curItem = $( this),
                            curText = curItem.find(">div").html();
                        self.textInner.html(curText);
                        self.core.show( curItem.attr( 'data-popup' ) );
                        return false;
                    }
                } );
                self.contents.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );
                self.popup.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
                self.btnClose.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
            },
            hide: function(){
                var scroll = self.popup.find('.popup__scroll') ;

                self.popup.css ({
                    'overflow-y': "hidden"
                });
                self.scrollConteiner.css( {
                    "overflow-y": "scroll",
                    paddingRight: 0
                } );

                self.popup.removeClass('popup_opened');
                self.popup.addClass('popup_hide');
                location.hash = '';

                setTimeout( function(){
                    self.popup.css ({
                        'overflow-y': "scroll"
                    });
                    self.popup.removeClass('popup_hide');
                    if(scroll.length){
                        scroll.getNiceScroll().resize();
                    }
                }, 300 );

            },
            getScrollWidth: function (){
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "popup__scrollbar-measure";
                document.body.appendChild(scrollDiv);

                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);

                return scrollbarWidth;
            },
            show: function( className ){
                var scroll = self.popup.find('.popup__scroll') ;
                self.core.setPopupContent( className );

                self.scrollConteiner.css( {
                    overflow: "hidden",
                    paddingRight: self.core.getScrollWidth()

                } );
                self.popup.addClass('popup_opened');
                self.core.centerWrap();

                self.popup.css ({
                    'overflow-y': "hidden"
                });

                if(scroll.length){
                    scroll.getNiceScroll().resize();
                }

            },
            setPopupContent: function( className ){
                var curContent = self.contents.filter( '.popup__' + className );

                self.contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            }

        };
    }
};
