(function () {

    var script = document.createElement('script');
    script.src =
        'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    var checkReady = function (callback) {
        if (window.jQuery) {
            callback(jQuery);
        } else {
            window.setTimeout(function () {
                checkReady(callback);
            }, 20);
        }
    };
    const exist = localStorage.getItem('productStore');

    checkReady(function ($) {

        var cssItems = {
            backGround: {
                width: '22%',
                minWidth: '340px',
                height: 'auto',
                background: '#06568D',
                backgroundImage: 'linear-gradient(#06568D, #C1DEF2)',
                position: 'fixed',
                top: 0,
                right: -10,
                borderBottomLeftRadius: 15,
                borderTopLeftRadius: 15,
                display: 'flex',
                zIndex: 99999999,
                boxSizing: 'border-box',
                marginTop: 75,
                boxShadow: '12px 9px 5px 3px #67A28B',
            },
            hideButton: {
                position: 'relative',
                right: 5,
                top: -3,
                margin: '5px 4px 0 auto',
                cursor: 'pointer',
                areaHidden: 'true',
                border: 'none',
                fontSize: 40,
                opacity: '1',
                color: '#0686DE'
            },
            buttonHover: {
                position: 'relative',
                top: -3,
                right: 5,
                margin: '5px 4px 0 auto',
                cursor: 'pointer',
                border: 'none',
                opacity: '0.7',
                color: '#121A4E'
            },
            mainTitle: {
                color: '#2B347E',
                background : '#14065D',
                backgroundImage: 'linear-gradient(#14065D, #B6DEF4)',
                width: '100%',
                height: '100%',
                display: 'flex',
                AlignItems: 'center',
                fontSize: 18,
                paddingLeft: 35,
                fontWeight: 'bold',
                borderRadius: 15,
                boxShadow: '8px 4px 7px'
            },
            itemLines: {
                width: '100%',
                height: '50%',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 15,
                boxSizing: 'content-box',
                gap: 8,
                borderRadius: 15,
            },
            line: {
                width: '96.5%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 15,
                paddingBottom: 10,
                paddingLeft: 5
            },
            lineLeft: {
                width: '25%',
                height: '100%',
                borderRadius: 15,
                marginRight: 5
            },
            lineRight: {
                width: '71%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 15,
                color: '#263070',
            },
            image: {
                width: '100%',
                height: '100%',
                float: 'left',
                borderRadius: 15,
                maxHeight: 100,
                boxShadow: '1px 1px 4px #3E9975'
            },
            itemTitle: {
                width: '100%',
                height: '100%',
                borderRadius: 15,
                fontWeight: 'bold',
                paddingLeft: 8,
                paddingTop: 3,
                fontSize: 13,
                maxHeight: 90
            },
            description: {
                width: '100%',
                height: '100%',
                borderRadius: 15,
                paddingLeft: 8,
                paddingTop: 3,
                fontSize: 14,
                maxHeight: 90
            },
            links: {
                width: '100%',
                height: '100%',
                borderRadius: 15,
                paddingLeft: 8,
                paddingTop: 3,
                fontSize: 14,
                textDecoration: 'none',
                color: '#263070'
            },
            notificationimg: {
                position: 'fixed',
                top: '0%',
                right: 25,
                width: 35,
                height: 35,
                zIndex: 99999999,
                float: 'right',
                cursor: 'pointer',
                marginTop: 90,
                fontSize: 35,
                color: '#073C66',
            }
        };

        var option = {
            hide: function () {
                $('#back').hide(function () {
                    var boxHide = $('#back');
                    boxHide.animate({ opacity: '0.7' }, 'fast');
                });
                $('#notificationModel').show(function () {
                    var notifShow = $('#notificationModel');
                    notifShow.animate({ opacity: '1' }, 'fast');
                });
            },

            show: function () {
                $('#notificationModel').hide(function () {
                    var notifHide = $('#notificationModel');
                    notifHide.animate({ opacity: '0.7' }, 'fast');
                });
                $('#back').show(function () {
                    var boxShow = $('#back');
                    boxShow.animate({ opacity: '1' }, 'fast');
                });
            }
        };

        function start() {
            notificationCenter();
            mouseEvents();
            jsFunctions();
            $('#notificationModel').hide();
            if (!exist) {
                $('#back').hide();
            }
        }

        function jsFunctions() {
            var fontAwesome = document.createElement('link');
            fontAwesome.setAttribute('rel', 'stylesheet');
            fontAwesome.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

            var select = document.querySelector('head');
            select.append(fontAwesome);

            var bell = document.querySelector('#notificationModel');
            bell.setAttribute('class', 'fa fa-bell');

            var button = document.querySelector('#hideBtn');
            button.setAttribute('class', 'fa fa-times-circle');

            if (exist) {
                var storaged = JSON.parse(localStorage.getItem('productStore'));
                for (let i = 0; i < storaged.length; i++) {
                    if (storaged[i].description.length > 23) {
                        storaged[i].description = storaged[i].description.substring(0, 23) + '...';
                    }
                }
                for (let i = 0; i < storaged.length; i++) {
                    var image = document.querySelector('#image-' + (i + 1));
                    image.setAttribute('src', storaged[i].imgUrl);
                    var title = document.querySelector('#item-title-' + (i + 1));
                    title.textContent = storaged[i].productTitle;
                    var description = document.querySelector('#description-' + (i + 1));
                    description.textContent = storaged[i].description;
                    var link = document.querySelector('#link-' + (i + 1));
                    link.setAttribute('href', storaged[i].linkUrl);
                }
            }
        }

        function mouseEvents() {
            const btn = document.querySelector('#hideBtn');
            btn.addEventListener('mouseenter', function () {
                $('#hideBtn').css(cssItems.buttonHover);
            });
            btn.addEventListener('mouseleave', function () {
                $('#hideBtn').css(cssItems.hideButton);
            })
        }

        function notificationCenter() {
            $('<i/>', { id: 'notificationModel' })
                .css(cssItems.notificationimg)
                .appendTo('body')
                .click(option.show);
            $('<div/>', { id: 'back' })
                .css(cssItems.backGround)
                .appendTo('body');
            $('<div/>', { id: 'items' })
                .css(cssItems.itemLines)
                .appendTo('#back');
            $('<div/>', { id: 'item-0' })
                .css(cssItems.line)
                .appendTo('#items');
            $('<div/>', { id: 'mainTitle' })
                .css(cssItems.mainTitle)
                .text('FIRSATLARIMIZI KEŞFEDİN')
                .appendTo('#item-0');
            $('<i/>', { id: 'hideBtn' })
                .css(cssItems.hideButton)
                .appendTo('#mainTitle')
                .click(option.hide);

            if (exist) {
                let storageCount = JSON.parse(localStorage.getItem('productStore')).length;

                for (let i = 1; i <= storageCount; i++) {
                    createItems(i);
                }
            }
        }
        function createItems(id) {
            $('<div/>', { id: 'item-' + id })
                .css(cssItems.line)
                .appendTo('#items');
            $('<div/>', { id: 'itemLeft-' + id })
                .css(cssItems.lineLeft)
                .appendTo('#item-' + id);
            $('<div/>', { id: 'itemRight-' + id })
                .css(cssItems.lineRight)
                .appendTo('#item-' + id);
            $('<img/>', { id: 'image-' + id })
                .css(cssItems.image)
                .appendTo('#itemLeft-' + id);
            $('<div/>', { id: 'item-title-' + id })
                .css(cssItems.itemTitle)
                .text('')
                .appendTo('#itemRight-' + id);
            $('<div/>', { id: 'description-' + id })
                .css(cssItems.description)
                .text('')
                .appendTo('#itemRight-' + id);
            $('<a/>', { id: 'link-' + id })
                .css(cssItems.links)
                .text('Ürüne Gitmek İçin Tıklayın')
                .appendTo('#itemRight-' + id);
        }

        var isOnProductPage = window.location.href.split('/').indexOf('urun') === -1 ? false : true;

        if (!document.querySelector('#back') && !isOnProductPage) {
            start();
        } else {
            var setItemList = {
                imgUrl: document.querySelector('[imageindex="0"]').src,
                productTitle: document.querySelector('.product-title').textContent.replaceAll('\n', ''),
                description: document.querySelector('.panel-body').querySelector('li').textContent,
                linkUrl: window.location.href
            }
            var storage = JSON.parse(localStorage.getItem('productStore')) || [];

            if (storage.length < 3) {
                storage.push(setItemList);
                localStorage.setItem('productStore', JSON.stringify(storage));
            } else {
                storage.shift();
                storage.push(setItemList);
                localStorage.setItem('productStore', JSON.stringify(storage));
            }
        }
    });
})();
