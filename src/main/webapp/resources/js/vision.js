/**
 * @author lyp
 * @date 2016-03-24
 * @module name
 * @description 看世界
 */
var showActiveImag = function () {
    $('.active-image-wrapper').animate({
        //opacity: '0.5',
        width: '100%'
    }, 'slow', function () {
        $('#active_image').show('fast');
        $('.show-control').hide();
    });
};
/*
 $();*/
var init = function () {
    var initPictures = function (pictureTag) {
        var tag = pictureTag ? pictureTag : 'all';
        /*  var tag = pictureTag;
         if (!tag) {
         tag = $('#sidebar').find('li.active').find('a').text();
         }*/
        var successCallback = function (resp) {
            if (resp['statuscode'] == '200') {
                var list = $('.ad-thumb-list').html('');
                $.each(resp['data'], function (idx, item) {
                    var li = $('<li></li>').appendTo(list);
                    var a = $('<a></a>').appendTo(li);
                    var img = $('<img>').appendTo(a);
                    if (item['src'] && item['src'].length) {
                        a.attr('href', 'resources/img/vision' + item['src']);
                        img.attr('src', 'resources/img/vision' + item['src']);
                    }
                    if (item['ip'] && item['ip'].length) {
                        img.attr('data-ip', item['ip']);
                    }
                    if (item['country'] && item['country'].length) {
                        img.attr('data-country', item['country']);
                    }
                    if (item['city'] && item['city'].length) {
                        img.attr('data-city', item['city']);
                    }
                    if (item['time']) {
                        img.attr('data-time', item['time']);
                    }
                    if (item['lng']) {
                        img.attr('data-lng', item['lng']);
                    }
                    if (item['lat']) {
                        img.attr('data-lat', item['lat']);
                    }
                });
                console.log(resp['countries']);
            }
            var galleries = $('.ad-gallery').adGallery();
            $('#switch-effect').change(function () {
                galleries[0].settings.effect = $(this).val();
                return false;
            });
            $('#toggle-slideshow').click(function () {
                galleries[0].slideshow.toggle();
                return false;
            });
            $('.active-image-wrapper').slideUp('slow', function () {
                $('.active-image-wrapper').show('fast');
            });
        };
        var errorCallback = function () {
            console.log('vision ajax error-');
        };
        LoadData.post({
            url: Constant.VISION_URL + tag,
            success: successCallback,
            error: errorCallback
        });
    };
    $('.nav-right a').fontFlex(14, 18, 60);//字体自适应
    //获取所有图片，生成列表
    initPictures();
    $('.hide-control').click(function () {
        $('.active-image-wrapper').animate({
            //opacity: '0.5',
            width: '0'
        }, 'slow', function () {
            $('#active_image').hide();
            $('.show-control').show();
        });
    });
    $('.show-control').click(function () {
        showActiveImag();
    });
    $('.nav-right').find('a').on('click', function () {
        console.log($(this).text());
    });
};