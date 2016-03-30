/**
 * @author lyp
 * @date 2016-03-24
 * @module name
 * @description 看世界
 */

var map, goLiveInterval;
var toggleActiveImg = function (opt) {
    var wrapper = $('.active-image-wrapper');
    switch (opt) {
        case 'show':
            if (wrapper.is(':hidden')) {
                wrapper.show();
            }
            wrapper.animate({
                width: '100%'
            }, 'slow', function () {
                $('#active_image').show('fast');
                $('.show-control').hide();
            });
            break;
        case 'hide':
            wrapper.animate({
                width: '0'
            }, 'slow', function () {
                $('#active_image').hide();
                $('.show-control').show();
            });
            break;
        default :
            break;
    }
};
var init = function () {
    //初始化地图

    //选择某个国家后的处理方法
    var onCountrySelected = function (countryName) {
        var showImgAfterSelected = function (image) {
            var nav = $('#gallery').find('.ad-nav');
            if (image) {
                var img_container = $('#image_container');
                img_container.find('img').attr('src', image.attr('src'));
                $('#img_right').attr('src', image.attr('src'));
                var caption = img_container.find('.caption p:first-child');
                caption.empty();
                var captionTxt = "";
                if (image.attr('data-ip')) {
                    captionTxt += 'IP地址：' + image.attr('data-ip') + '<br>'
                }
                if (image.attr('data-lng')) {
                    captionTxt += '经度：' + image.attr('data-lng') + '<br>'
                }
                if (image.attr('data-lat')) {
                    captionTxt += '经度：' + image.attr('data-lat') + '<br>'
                }
                if (image.attr('data-country')) {
                    captionTxt += '国家：' + image.attr('data-country') + '<br>'
                }
                if (image.attr('data-city')) {
                    captionTxt += '城市：' + image.attr('data-city') + '<br>'
                }
                if (image.attr('time')) {
                    captionTxt += '时间：' + image.attr('time') + '<br>'
                }
                caption.html(captionTxt);
                //high light
                $('#gallery').find('.ad-thumbs').find('.ad-active').removeClass('ad-active');
                image.closest('a').addClass('ad-active');
                image.fadeTo(300, 1);
            }
        };
        $('#search_hideseek').val(countryName);
        if ($('#selectBox').find('ul.list').find('li').length <= 1)return;
        //只显示指定国家countryName的图片
        var imgList = $('.ad-thumb-list').find('li');
        var image, found = false;
        $.each(imgList, function (idx, li) {
            var imgLi = $(li);
            if (imgLi.find('img').attr('data-country') != countryName) {
                imgLi.hide();
            } else {
                if (!found) {
                    image = imgLi.find('img');
                    found = true;
                }
                imgLi.show();
            }
        });
        showImgAfterSelected(image);
    };
    //根据pictureTag的值ajax获取数据，生成thumbnail
    var initPictures = function (pictureTag) {
        //var tag = pictureTag ? pictureTag : 'all';
        var tag = pictureTag;
        if (!tag) {
            tag = $('#sidebar').find('li.active').find('a').text();
        }
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
                    if (item['pictureUrl']) {
                        img.attr('data-pictureUrl', item['pictureUrl'])
                    }
                });
                //countries
                var countries = resp['countries'];
                var $countries = $('#selectBox').find('ul').empty();
                for (var k in countries) {
                    var $a = $('<a>' + k + '（' + countries[k] + '）</a>')
                        .attr({
                            'data-country': k,
                            'href': '#'
                        }).on('click', function (e) {
                            e.preventDefault();
                            onCountrySelected($(this).attr('data-country'));
                        });
                    $countries.append($('<li style="display: list-item;"></li>').append($a));
                }
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
            $('.active-image-wrapper').slideUp('slow');
        };
        var errorCallback = function () {
            console.log('vision ajax error-');
        };
        LoadData.post({
            url: 'vision/getPictures/' + tag,
            success: successCallback,
            error: errorCallback
        });
    };
    //starts -----------l
    $('.nav-right a').fontFlex(14, 18, 60);//字体自适应
    //获取所有图片，生成列表
    initPictures();
    $('.hide-control').click(function () {
        toggleActiveImg('hide');
    });
    $('.show-control').click(function () {
        toggleActiveImg('show');
    });
    //监听导航事件
    $('.nav-right').find('a').on('click', function () {
        initPictures($(this).text());
        $('.nav-right').find('li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('#search_hideseek').val('');
    });
    //监听查询框
    $('#search_hideseek').hideseek({
        highlight: true,
        nodata: '无相关数据'
    })
        .keyup(function (e) {
            if (e.keyCode == 13) {
                var list = $(this).next().find('li');
                for (var i = 0; i < list.length; i++) {
                    var $li = $(list[i]);
                    if ($li.attr('style') && $li.attr('style').indexOf('display: list-item;') != -1) {
                        var country = $li.find('a').attr('data-country');
                        if (country) {
                            console.log(country);
                            onCountrySelected(country);
                            break;
                        }
                    }
                }
            }
        });
    //监听Go live
    $('#goLive').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('disabled'))return;
        if ($this.hasClass('running')) {
            clearInterval(goLiveInterval);
            $this.removeClass('running');
            $this.text('Go Live');
            return;
        }
        $this.addClass('running');
        $('#img_right')
            .attr('src', $('#goLive').attr('href'))
            .error(function () {
                clearInterval(goLiveInterval);
                $(this).attr('src', 'resources/img/vision/thumb_no.jpg')
            });
        goLiveInterval = setInterval(function () {
            $('#img_right').attr('src', $('#goLive').attr('href') + '?t=' + new Date().getTime());
        }, 1000);
        $this.text('Stop');
    });
};