/**
 * @author lyp
 * @date 2016-03-24
 * @module name
 * @description 看世界
 */

var map, goLiveInterval, goLiveTimeout, firstLoad = true, MyMap;
$(function () {
    MyMap = {
        sr: (function () {
            require(["esri/SpatialReference"], function (SR) {
                return new SR({wkid: 102100});
            });
        }()),
        init: function () {
            require(["esri/map", "esri/geometry/Extent", "dojo/domReady!"], function (Map, Extent) {
                var baseExtent, buffer = 10000000;
                map = new Map("mapHolder", {
                    center: [-189.323, 34.355],
                    zoom: 3,
                    minZoom: 3,
                    maxZoom: 3,
                    basemap: "gray",
                    //basemap: "dark-gray",
                    slider: false,
                    logo: false
                });
                map.on('load', function () {
                    var ext = map.extent;
                    MyMap.sr = map.spatialReference;
                    baseExtent = new Extent(ext.xmin, ext.ymin - buffer, ext.xmax, ext.ymax + buffer, MyMap.sr);
                    console.log(ext, baseExtent);
                });
                map.on('pan-end', function (e) {
                    if (map.extent.ymin < baseExtent.ymin || map.extent.ymax > baseExtent.ymax) {
                        baseExtent.xmin = map.extent.xmin;
                        baseExtent.xmax = map.extent.xmax;
                        map.setExtent(baseExtent);
                    }
                });
                map.on('click', function (e) {
                    //console.log(map.toScreen(e.mapPoint));
                });
            });
        },
        centerAt: function (device) {
            if (map && map != null) {
                require([
                    "esri/geometry/Point",
                    "esri/symbols/PictureMarkerSymbol",
                    "esri/graphic",
                    "esri/InfoTemplate",
                    "esri/geometry/webMercatorUtils"
                ], function (Point, PictureMarkerSymbol, Graphic, InfoTemplate, MercatorUtils) {
                    var x = parseFloat(device.lng), y = parseFloat(device.lat);
                    var lnglat = new Point(x, y, MyMap.sr);
                    var point = MercatorUtils.geographicToWebMercator(lnglat);
                    var symbol = new PictureMarkerSymbol('resources/img/location.gif', 40, 40);
                    var attr = {
                        "ip": device.ip,
                        "lng": x,
                        "lat": y,
                        "country": device.country,
                        "city": device.city,
                        "time": device.time
                    };
                    /* var template = new InfoTemplate("")
                     .setContent("IP：${ip}<br>经度：${lng}<br>纬度：${lat}<br>国家：${country}<br>城市：${city}<br>时间：${time}");*/
                    var graphic = new Graphic(point, symbol, attr);
                    if (map.graphics != null) {
                        map.graphics.clear();
                        map.graphics.add(graphic);
                    }
                    //var extent = map.extent;
                    //var adjustedY = parseFloat(point.y - Math.abs(Math.abs(extent.ymax) - Math.abs(extent.ymin)) / 3);
                    var adjustedY = point.y - 4076570;
                    map.centerAndZoom(new Point(point.x, adjustedY, MyMap.sr), 3);
                });
            }
        },
        clear: function () {
            if (map && map.graphics != null) {
                //console.log('MyMap.clear() ======');
                map.graphics.clear();
            }
        }
    };
});
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
    //选择某个国家后的处理方法
    var onCountrySelected = function (countryName) {
        var showImgAfterSelected = function (image) {
            if (image) {
                var captionTxt = "", thumb_opacity = 0.7, device = {};
                var thumbs_wrapper = $('#gallery').find('.ad-thumbs');
                var img_container = $('#image_container');
                var caption = img_container.find('.caption p:first-child');
                img_container.find('img').attr('src', image.attr('src'));
                $('#img_right').attr('src', image.attr('src'));
                caption.empty();
                if (image.attr('data-ip')) {
                    device.ip = image.attr('data-ip');
                    captionTxt += 'IP地址：' + image.attr('data-ip') + '<br>'
                }
                if (image.attr('data-lng')) {
                    device.lng = image.attr('data-lng');
                    captionTxt += '经度：' + image.attr('data-lng') + '<br>'
                }
                if (image.attr('data-lat')) {
                    device.lat = image.attr('data-lat');
                    captionTxt += '经度：' + image.attr('data-lat') + '<br>'
                }
                if (image.attr('data-country')) {
                    device.country = image.attr('data-country');
                    captionTxt += '国家：' + image.attr('data-country') + '<br>'
                }
                if (image.attr('data-city')) {
                    device.city = image.attr('data-city');
                    captionTxt += '城市：' + image.attr('data-city') + '<br>'
                }
                if (image.attr('time')) {
                    device.time = image.attr('data-time');
                    captionTxt += '时间：' + image.attr('time') + '<br>'
                }
                caption.html(captionTxt);
                //high light
                thumbs_wrapper.animate({scrollLeft: '0px'})
                    .find('.ad-active').removeClass('ad-active')
                    .find('img').fadeTo(300, thumb_opacity);
                image.fadeTo(300, 1)
                    .closest('a').addClass('ad-active');
                //hide active image
                toggleActiveImg('hide');
                //center map
                MyMap.centerAt(device);
            }
        };
        var selectBox = $('#selectBox');
        if (selectBox.find('li:first-child').hasClass('no-results'))return;
        //只显示指定国家countryName的图片
        var imgList = $('.ad-thumb-list').find('li');
        var image, found = false;
        $('#search_hideseek').val(countryName);
        selectBox.find('a.active').removeClass('active');
        console.log();
        selectBox.find('a[data-country=' + countryName + ']').addClass('active');
        $.each(imgList, function (idx, li) {
            var imgLi = $(li);
            if (countryName == 'all' || imgLi.find('img').attr('data-country') == countryName) {
                if (!found) {
                    image = imgLi.find('img');
                    found = true;
                }
                imgLi.show();
            } else {
                imgLi.hide();
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
                $countries.append('<li><a class="active" data-country="all" href="#">全部（' + resp['total'] + '）</a></li>');
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
    //starts -----------
    $('.nav-right a').fontFlex(14, 18, 60);//字体自适应
    MyMap.init();                           //地图初始化
    initPictures();                         //获取所有图片，生成列表
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
        MyMap.clear();
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
        var N = 1;
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

/*
        // Function that refreshes image
        function refresh(image, imageSrc) {
            var timestamp = new Date().getTime();
            image.attr('src', imageSrc + '?' + timestamp);
        }

        // Refresh image every N seconds
        goLiveTimeout = setTimeout(function () {
            refresh($('#img_right'), $('#goLive').attr('href'));
        }, N * 1000);
*/

        goLiveInterval = setInterval(function () {
            $('#img_right').attr('src', $('#goLive').attr('href') + '?t=' + new Date().getTime());
        }, 1000);
        $this.text('Stop');
    });
    firstLoad = false;
};