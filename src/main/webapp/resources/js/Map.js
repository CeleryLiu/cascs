/*
 * Created by lyp on 2016/2/27.
 * Author: lyp
 * Date: 2016/2/27
 * Description: map model
 * Version: V1.0
 */
var ArcMap = {
    _WRAPPER_SEL: (function () {
        return '.map-wrapper';
    }()),
    v: {
        MAP_PAGE_SIZE: 10,
        map: {},
        countryFS: {},  //Country Feature Set, 在main中初始化
        provinceFS: {}, //Province Feature Set, 在main中初始化
        cityFS: {}, //City Feature Set,
        cityLayer: {},
        clusterLayer: {},
        featureLayer: {},
        labelLayer: {}
    },
    initFeatureSets: function () {
        var getFeatureSet = function (url, which) {
            Pace.ignore(function () {
                $.ajax({
                    url: url,
                    type: "post",
                    contentType: "application/json",
                    dataType: "json",
                    timeout: 50000
                }).success(function (data) {
                    //console.log(url + "  succeed.", data);
                    if (which == 'country') {
                        ArcMap.v.countryFS = data.data;
                    } else if (which == 'province') {
                        ArcMap.v.provinceFS = data.data;
                    } else if (which == 'city') {
                        ArcMap.v.cityFS = data.data;
                    }
                }).error(function () {
                    console.log("Getting country feature set error!");
                }).fail(function () {
                    console.log("Getting country feature set failed!");
                });
            });
        };
        //获取国家Layer数据
        getFeatureSet(Constant.COUNTRY_FEATURESET_URL, 'country');
        //获取省份Layer数据
        getFeatureSet(Constant.PROVINCE_FEATURESET_URL, 'province');
    },
    init: function () {
        require(
            [
                "esri/map",
                "esri/layers/ArcGISTiledMapServiceLayer",
                "esri/layers/GraphicsLayer",
                "esri/InfoTemplate",
                "esri/layers/FeatureLayer",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/Color",
                //"esri/dijit/HomeButton",
                "dojo/domReady!"
            ],
            function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, InfoTemplate, FeatureLayer, SimpleLineSymbol, SimpleFillSymbol, Color, HomeButton) {
                var map, featureLayer, labelLayer, cityLayer;
                //Create map and add layers
                map = new Map("mapHolder", {
                    //basemap: 'gray',
                    center: [114.25, 24.1167],
                    minZoom: 3,
                    maxZoom: 8,
                    zoom: 4,
                    sliderPosition: "top-right",
                    logo: false
                });
                //（1）添加底图
                var basemap = new ArcGISTiledMapServiceLayer(Constant.BASEMAP_URL);
                map.addLayer(basemap);

                //（2）添加用于显示分布图的graphic layer
                var featureLayerInfoTemplate = new InfoTemplate("${Name_CHN}", "国家：<b>${Name_CHN}<b><br>共发现目标：<b>${count}</b>个");
                var flOutline = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([230, 255, 0]), 2), new Color([121, 37, 135, 0.7]));
                featureLayer = new GraphicsLayer(featureLayerInfoTemplate);
                featureLayer.on('click', function (evt) {
                    var attr = evt.graphic.attributes;
                    var name = attr.Name_CHN ? attr.Name_CHN : attr.NAME;
                    $('.f-country').text(name);
                    $('.f-count').text(attr.count);
                });
                //FOR OUTLINE
                featureLayer.on('mouse-over', function (evt) {
                    //console.log('on mouse over', evt.graphic);
                    evt.graphic.setSymbol(flOutline);
                });
                featureLayer.on('mouse-out', function (evt) {
                    //console.log('on mouse out');
                    evt.graphic.setSymbol(null);
                });
                map.addLayer(featureLayer);

                //(3)添加文字层，为featureLayer添加设备数量信息
                labelLayer = new GraphicsLayer();
                map.addLayer(labelLayer);

                map.on('load', function () {
                    console.log("map loaded");
                    //（4）添加城市featureLayer
                    Pace.ignore(    //不显示进度条
                        function () {
                            ArcMap.v.cityLayer = new FeatureLayer(Constant.CITY_FEATURELAYER_URL, {
                                outFields: ["*"]
                            });
                            ArcMap.v.cityLayer.setMaxAllowableOffset(map.extent.getWidth() / map.width);
                        }
                    );

                    //(5)初始化ArcMap的全局变量
                    ArcMap.v.map = map;
                    ArcMap.v.featureLayer = featureLayer;
                    ArcMap.v.labelLayer = labelLayer;

                    //（6）listeners
                    $('#sidebarCtrl').on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        $this.toggleClass('open');
                        if ($this.hasClass('open')) {
                            Sidebar.show();
                            $this.html('<span class="glyphicon glyphicon-triangle-left"></span>' + '隐藏侧栏');
                        } else {
                            Sidebar.hide();
                            $this.html('<span class="glyphicon glyphicon-triangle-right"></span>' + '显示侧栏');
                        }
                    });
                    $('#mapSidebarCtrl').on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this), mapSidebar = $('#mapSidebar');
                        if (MapSidebar.isHidden()) {
                            MapSidebar.show();
                            $this.html('隐藏数据' + '<span class="glyphicon glyphicon-triangle-left"></span>');
                        } else {
                            MapSidebar.hide();
                            $this.html('显示数据' + '<span class="glyphicon glyphicon-triangle-right"></span>');
                        }
                    });//暂时未使用
                    $('.map-sidebar-link')
                        .on('click', function (e) {
                            e.preventDefault();
                            //$('#mapSidebar').toggleClass('active')
                            //$('#mapSidebar').toggleClass('active')

                        })
                        .on('hover', function (e) {
                            e.preventDefault();
                            $('#mapSidebar').addClass('onHover');
                        });
                });
                map.on('zoom-end', function (e) {
                    //console.log("zoom level: " + map.getZoom());
                    if ($('#city').hasClass('open')) {
                        MyFeatureLayer.updateCityLayer(ArcMap.v);
                    }
                });

                map.on('pan-end', function (e) {
                    //console.log("paning: " + map.getZoom());
                });
            });
    },
    onLoad: function () {
        $(Sidebar._WRAPPER_SEL).addClass('map');
        $('.pivots li').addClass('map');
        ResultOverview.hide();
    },
    onLeave: function () {
        $(Sidebar._WRAPPER_SEL).removeClass('map');
        $('.pivots li').removeClass('map');
    },
    render: function (data) {
        console.log("ArcMap.render() ======");

        var layerToShow = $('.map-layer').find('a.open'),
            whichFeature = layerToShow ? layerToShow.attr('id') : 'country',
            map = this.v.map;
        if (!isEmptyObject(map)) {
            //（1）添加设备层
            //addClusters(data['data']);
            //（2）显示地图右侧边栏
            //MapSidebar.init(data);
            //(3)默认显示分布图
            MyFeatureLayer.show(whichFeature, this.v, data);
        } else {
            var interval = setInterval(function () {
                if (!isEmptyObject(map)) {
                    //（1）添加设备层
                    //addClusters(data['data']);
                    //（2）显示地图右侧边栏
                    //MapSidebar.init(data);
                    //(3)默认显示分布图
                    MyFeatureLayer.show(whichFeature, ArcMap.v, data);
                    clearInterval(interval);
                }
            }, 1000);
        }
        //(4)监听tool bar的分布图点击事件
        $('.map-layer a').removeClass('disabled')
            .on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.toggleClass('open');
                if ($this.hasClass('open')) {
                    $('.map-layer a').removeClass('open').find('span').removeClass('glyphicon-eye-open');
                    $this.addClass('open').find('span').addClass('glyphicon-eye-open');
                    MyFeatureLayer.show($this.attr('id'), ArcMap.v, data);
                } else {
                    MyFeatureLayer.hide();
                    $this.removeClass('open').find('span').removeClass('glyphicon-eye-open');
                }
            });
        $('#labelLayerCtrl').removeClass('disabled').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            if (!$this.hasClass('active')) {
                ArcMap.v.labelLayer.show();
                $this
                    .addClass('active')
                    .html('隐藏数量 ' + '<span class="glyphicon glyphicon-eye-open"></span>');
            } else {
                ArcMap.v.labelLayer.hide();
                $this
                    .removeClass('active')
                    .html('显示数量 ' + '<span class="glyphicon glyphicon-eye-close"></span>');
            }
        });
    },
    search: function (pageNum) {
        console.log("ArcMap.search() ======");
        var wd = GlobalSearch.getValue();
        if (!wd && wd == '') return;
        var successCallback = function (data) {
            var statuscode = data['statuscode'];
            //（1）将data添加到sessionStorage.data
            Session.set('data', data);
            if (statuscode == 200) {
                console.log('Map search succeed. statuscode == 200', data);
                //(2.a)调用Sidebar的render方法，生成sidebar
                Sidebar.render(data);
                //(2.b)调用Map的render方法，生成搜索结果页面
                ArcMap.render(data);
                //(3)隐藏no-data div
                $('.no-data').hide();
            } else if (statuscode == 204) {
                noDataHandler();
            } else {
                errorHandler();
            }
        };
        var requestObj = {
            'url': Constant.LIST_SEARCH_URL,
            //'success': successCallback,
            'error': errorHandler,
            'data': {
                'wd': wd + ' ' + Pivot.getUserSelected(),
                //"geo": getVisibleExtent(),
                //"zoomlevel": ArcMap.v.map.getZoom(),
                'pagesize': this.v.MAP_PAGE_SIZE,
                'page': pageNum ? pageNum : 1
            }
        };
        LoadData.post(requestObj);

        //获取地图的可视范围的经纬度
        function getVisibleExtent() {
            var polygonCCW = '';
            require([
                "esri/geometry/ScreenPoint",
                "esri/geometry/webMercatorUtils"
            ], function (ScreenPoint, webMercatorUtils) {
                var map = ArcMap.v.map;
                var windowHeight = $(window).height(), windowWidth = $(window).width();
                var sLeftTop = new ScreenPoint(0, 0),
                    sRightBottom = new ScreenPoint(windowWidth, windowHeight);
                var mLeftTop = webMercatorUtils.webMercatorToGeographic(map.toMap(sLeftTop)),
                    mRightBottom = webMercatorUtils.webMercatorToGeographic(map.toMap(sRightBottom));
                /* var mLeftTop = map.toMap(sLeftTop),
                 mRightBottom = map.toMap(sRightBottom);*/

                var xL = mLeftTop.x, xR = mRightBottom.x, yT = mLeftTop.y, yB = mRightBottom.y;
                //逆时针，4个点，首尾闭合
                polygonCCW = 'polygon(' +
                xL + ' ' + yT + ',' +             //左上
                xL + ' ' + yB + ',' +             //左下
                xR + ' ' + yB + ',' +             //右下
                xR + ' ' + yT + ',' +             //右上
                xL + ' ' + yT + ')';              //首尾闭合
            });
            return polygonCCW;
        }
    },
    addClusterLayer: function (devices) {
        //监听设备点击事件：缩放，并在地图侧边栏高亮这些设备的。缩放到最大级别时显示windowTemplate----------待添加
        var cleanUp = function () {
            map.infoWindow.hide();
            clusterLayer.clearSingles();
        };
        if (!devices) {
            return;
        }
        if (clusterLayer) {
            map.removeLayer(clusterLayer);
            clusterLayer.clear();
        }
        require([
            "esri/SpatialReference",
            "esri/dijit/PopupTemplate",
            "esri/geometry/Point",
            "esri/geometry/webMercatorUtils",

            "extras/ClusterLayer",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/renderers/ClassBreaksRenderer",
            "esri/symbols/SimpleFillSymbol"

        ], function (SpatialReference, PopupTemplate, Point, webMercatorUtils, ClusterLayer,
                     SimpleLineSymbol, SimpleMarkerSymbol, PictureMarkerSymbol, ClassBreaksRenderer) {
            var devicesInfo = {};
            var wgs = new SpatialReference({
                "wkid": 4326
            });

            devicesInfo.data = $.map(devices, function (d) {
                var latlng = new Point(parseFloat(d.lon), parseFloat(d.lat), wgs);
                var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                var ports = d.ports, vuls = d.vuls, portsStr = '', vulsStr = '', imgArr = [];
                for (var i = 0; i < ports.length; i++) {
                    for (var p in ports[i]) {
                        portsStr += p + ' ';
                    }
                }
                for (var j = 0; j < vuls.length; j++) {
                    for (var key in vuls[j]) {
                        vulsStr += key + " ";
                        if (vuls[j][key].hasOwnProperty('imgURL') && vuls[j][key]['imgURL'] != '') {
                            imgArr.push(vuls[j][key]['imgURL']);
                        }
                    }
                }

                var attributes = {
                    "IP": d.ip,
                    "Location": d.location,
                    //"Ports": portsStr.substr(0, portsStr.length - 2),
                    "Ports": portsStr,
                    "Tags": d.tags,
                    "Vuls": vulsStr,
                    //"Vuls": vulsStr.substr(0, vulsStr.length - 2),
                    "Timestamp": d.timestamp,
                    "Image": imgArr[0]
                    //"Link": d.link
                };
                return {
                    "x": webMercator.x,
                    "y": webMercator.y,
                    "attributes": attributes
                };
            });

            // popupTemplate to work with attributes specific to this dataset
            var popupTemplate = new PopupTemplate({
                "title": "",
                "fieldInfos": [{
                    "fieldName": "IP",
                    visible: true
                }, {
                    "fieldName": "Location",
                    "label": "位置：",
                    visible: true
                }, {
                    "fieldName": "Ports",
                    "label": "服务：",
                    visible: true
                }, {
                    "fieldName": "Vuls",
                    "label": "漏洞：",
                    visible: true
                }, {
                    "fieldName": "Tags",
                    "label": "标签：",
                    visible: true
                }/*, {
                 "fieldName": "Timestamp",
                 "label": "更新时间：",
                 visible: true
                 }*/],
                "mediaInfos": [{
                    "title": "",
                    "caption": "",
                    "type": "image",
                    "value": {
                        "sourceURL": "{Image}",
                        "linkURL": "{Image}"
                    }
                }]
            });
            // cluster layer that uses OpenLayers style clustering
            clusterLayer = new ClusterLayer({
                "data": devicesInfo.data,
                "distance": 100,
                "id": "clusters",
                "labelColor": "#fff",
                "labelOffset": 10,
                "resolution": map.extent.getWidth() / map.width,
                "singleColor": "#888",
                "singleTemplate": popupTemplate
            });
            var defaultSym = new SimpleMarkerSymbol().setSize(4);
            var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

            var green = new PictureMarkerSymbol(imgUrl + "green.png", 64, 64).setOffset(0, 15);
            var red = new PictureMarkerSymbol(imgUrl + "red.png", 72, 72).setOffset(0, 15);
            renderer.addBreak(0, 200, green);
            renderer.addBreak(200, 1001, red);

            clusterLayer.setRenderer(renderer);
            map.addLayer(clusterLayer);
            clusterLayer.redraw();

            var cp = new Point(devices[0].lon, devices[0].lat);
            map.centerAndZoom(cp, 4);

            clusterLayer.on('click', function (e) {
                console.log("cluster layer's feature is clicked");
                e.preventDefault();
            });

            /*// close the info window when the map is clicked
             map.on("click", cleanUp);*/

            // close the info window when esc is pressed
            map.on("key-down", function (e) {
                if (e.keyCode === 27) {
                    cleanUp();
                }
            });
        });
    },
    onSearchSucceed: function (data) {
        var statuscode = data['statuscode'];
        //（1）将data添加到sessionStorage.data
        Session.set('data', data);
        if (statuscode == 200) {
            console.log('Map search succeed. statuscode == 200', data);
            //(2.a)调用Sidebar的render方法，生成sidebar
            Sidebar.render(data);
            //(2.b)调用Map的render方法，生成搜索结果页面
            ArcMap.render(data);
            //(3)隐藏no-data div
            $('.no-data').hide();
        } else if (statuscode == 204) {
            noDataHandler();
        } else {
            errorHandler();
        }
    }
};
var MyFeatureLayer = {
    featuresDisplayed: {},
    show: function (which, mapVar, data) {
        //obj: map,featureLayer,labelLayer,countryFS,provinceFS,cityLayer
        console.log("MyFeatureLayer.show() ======");
        var map = mapVar.map,
            featureLayer = mapVar.featureLayer,
            labelLayer = mapVar.labelLayer,
            countryFS = mapVar.countryFS,
            provinceFS = mapVar.provinceFS,
            cityLayer = mapVar.cityLayer;
        Pace.start();
        if (!isEmptyObject(data) && data['statuscode'] == 200) {
            $('#featureInfo').show();
            map.removeLayer(featureLayer);
            featureLayer.clear();
            map.removeLayer(labelLayer);
            labelLayer.clear();
            switch (which) {
                case 'country':
                    showCountry(data['aggregation']);
                    break;
                case 'province':
                    showProvince(data['aggregation']);
                    break;
                case 'city':
                    showCityFromArcGis(data['aggregation']);
                    break;
            }
        } else {
            noDataHandler();
        }
        Pace.stop();
        function showCountry(agg) {
            if (!agg['country@%city'] || isEmptyObject(agg['country@%city']))return;
            if (countryFS.features && !isEmptyObject(countryFS.features)) {
                render(agg['country@%city'], countryFS.features);
            } else {
                console.log("country layer is not loaded yet. wait...");
                var wait = setInterval(function () {
                    if (countryFS.features && !isEmptyObject(countryFS.features)) {
                        render(agg['country@%city'], countryFS.features);
                        clearInterval(wait);
                    }
                }, 1000);
            }
            function render(countries, features) {
                console.log("countryLayer is rendering...");
                var min = Number.MAX_VALUE, max = 0;
                require(["esri/graphic"], function (Graphic) {
                    for (var key in countries) {
                        var country = countries[key];
                        if (country.en && features.hasOwnProperty(country.en)) {
                            var g = features[country.en];
                            g.attributes.count = country.count;
                            g.attributes.Name_CHN = key;
                            var newGraphic = new Graphic(g);
                            featureLayer.add(newGraphic);
                            MyFeatureLayer.addLabel(labelLayer, newGraphic, country.count);//add text to labelLayer
                            setMinMax(country.count);
                        }
                    }
                    renderFeatureLayer(featureLayer, min, max);
                });
                function setMinMax(count) {
                    if (count < min) {
                        min = count;
                    }
                    if (count > max) {
                        max = count;
                    }
                }
            }
        }

        function showProvince(agg) {
            console.log("province is rendering ...");
            if (!agg['province'] || isEmptyObject(agg['province']))return;
            if (provinceFS.features && !isEmptyObject(provinceFS.features)) {
                render(agg['province'], provinceFS.features);
            } else {
                console.log("province layer is not loaded yet. wait...");
                var wait = setInterval(function () {
                    if (provinceFS.features && !isEmptyObject(provinceFS.features)) {
                        render(agg['province'], provinceFS.features);
                        clearInterval(wait);
                    }
                }, 1000);
            }
            function render(provinces, features) {
                var min = Number.MAX_VALUE, max = 0;
                require(["esri/graphic", "esri/symbols/TextSymbol", "esri/Color",
                    'esri/symbols/Font'], function (Graphic, TextSymbol, Color, Font) {
                    for (var key in features) {
                        if (provinces.hasOwnProperty(key)) {
                            var g = features[key];
                            var count = provinces[key];
                            g.attributes.count = count;
                            var newGraphic = new Graphic(g);
                            featureLayer.add(newGraphic);
                            MyFeatureLayer.addLabel(labelLayer, newGraphic, count);//add text to labelLayer
                            setMinMax(count);
                        }
                    }
                    renderFeatureLayer(featureLayer, min, max);
                });
                function setMinMax(count) {
                    if (count < min) {
                        min = count;
                    }
                    if (count > max) {
                        max = count;
                    }
                }
            }
        }

        function showCityFromArcGis(agg) {
            console.log("city is rendering ...", agg);
            if (!agg['country@%city'] || isEmptyObject(agg['country@%city']))return;
            var countries = agg['country@%city'], cities = {};
            for (var co in countries) {
                var country = countries[co];
                if (co == '中国' || country.en == 'China') {
                    cities = country['cities'];
                    break;
                }
            }
            if (isEmptyObject(cities))return;
            if (cityLayer.graphics && cityLayer.graphics.length > 0) {
                render(cities, cityLayer.graphics);
            } else {
                var count = 0;
                var wait = setInterval(function () {
                    console.log('waiting city fs init....', count++);
                    if ((cityLayer.graphics && cityLayer.graphics.length > 0) || count > 10) {
                        render(cities, cityLayer.graphics);
                        clearInterval(wait);
                    }
                }, 1000);
            }

            function render(cities, features) {
                console.log("cityLayer rendering ...feature:", features);
                var min = Number.MAX_VALUE, max = 0;
                for (var key in cities) {
                    for (var i = 0; i < features.length; i++) {
                        if (features[i].attributes['Name_CHN'].indexOf(key) >= 0) {
                            var count = cities[key];
                            var g = features[i];
                            g.attributes.count = count;
                            featureLayer.add(g);
                            MyFeatureLayer.addLabel(labelLayer, g, count);//add text to labelLayer
                            setMinMax(count);
                            MyFeatureLayer.featuresDisplayed[key] = count;
                        }
                    }
                }
                renderFeatureLayer(featureLayer, 0, max);
                function setMinMax(count) {
                    if (count < min) {
                        min = count;
                    }
                    if (count > max) {
                        max = count;
                    }
                }
            }
        }

        function renderFeatureLayer(layer, min, max) {
            require([
                "esri/graphic",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"
                //"esri/dijit/Legend"
            ], function (Graphic, SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol, Legend) {
                var sfs = new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128])));
                var renderer = new SimpleRenderer(sfs);
                renderer.setColorInfo({
                    field: "count",
                    minDataValue: min,
                    maxDataValue: max,
                    colors: [
                        new Color([221, 200, 225, 0.75]),
                        new Color([121, 37, 135, 0.7])
                    ]
                });
                layer.setRenderer(renderer);
                map.addLayer(layer, 3);
                layer.show();
                map.addLayer(labelLayer, 4);
                //map.reorderLayer(clusterLayer, 100);
            });
        }
    },
    hide: function () {
        console.log("MyFeatureLayer.hide() ======");
        ArcMap.v.featureLayer.clear();
        ArcMap.v.featureLayer.hide();
        ArcMap.v.labelLayer.clear();
        ArcMap.v.labelLayer.hide();
        $('#featureInfo').hide();
    },
    updateCityLayer: function (mapVariables) {
        var cities = MyFeatureLayer.featuresDisplayed,
            cityLayer = mapVariables.cityLayer, featureLayer = mapVariables.featureLayer;
        if (cityLayer.graphics && cityLayer.graphics.length > 0) {
            console.log("city is updating ...");
            render(cities, cityLayer.graphics);
        } else {
            console.log("city layer is not loaded yet. wait...");
            var wait = setInterval(function () {
                if (cityLayer.graphics && cityLayer.graphics.length > 0) {
                    render(cities, cityLayer.graphics);
                    clearInterval(wait);
                }
            }, 1000);
        }

        function render(cities, features) {
            console.log("cityLayer rendering ...", features);
            var min = Number.MAX_VALUE, max = 0;
            for (var key in cities) {
                for (var i = 0; i < features.length; i++) {
                    if (features[i].attributes['Name_CHN'].indexOf(key) >= 0) {
                        var count = cities[key];
                        var g = features[i];
                        g.attributes.count = count;
                        featureLayer.add(g);
                        MyFeatureLayer.addLabel(mapVariables.labelLayer, g, count);//add text to labelLayer
                        setMinMax(count);
                    }
                }
            }
            renderFeatureLayer(featureLayer, 0, max);
            function setMinMax(count) {
                if (count < min) {
                    min = count;
                }
                if (count > max) {
                    max = count;
                }
            }
        }

        function renderFeatureLayer(layer, min, max) {
            require([
                "esri/graphic",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"
                //"esri/dijit/Legend"
            ], function (Graphic, SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol, Legend) {
                var sfs = new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(.2).setColor(new Color('#000')));
                var renderer = new SimpleRenderer(sfs);
                renderer.setColorInfo({
                    field: "count",
                    minDataValue: min,
                    maxDataValue: max,
                    colors: [
                        new Color([221, 200, 225, 0.75]),
                        new Color([121, 37, 135, 0.7])
                    ]
                });
                layer.setRenderer(renderer);
                mapVariables.map.addLayer(layer, 3);
                layer.show();
                mapVariables.map.addLayer(ArcMap.v.labelLayer, 4);
                //map.reorderLayer(clusterLayer, 100);
            });
        }
    },
    addLabel: function (layer, graphic, text) {
        // add number to feature
        require(["esri/graphic", "esri/symbols/TextSymbol", "esri/Color",
            'esri/symbols/Font'], function (Graphic, TextSymbol, Color, Font) {
            var label = new TextSymbol(
                text,
                new Font("15pt", Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER, "Courier"),
                new Color([60, 215, 60])
            );
            layer.add(new Graphic(graphic.geometry, label));
        });
    }
};
var MapSidebar = {
    _WrapperSel: '#mapSidebar',
    wrapper: $('#mapSidebar'),
    isHidden: function () {
        //console.log('Inside MapSidebar.isHidden() ======');
        return $(this._WrapperSel).is(':hidden');
    },
    show: function () {
        console.log("FUNCTION CALL: MapSidebar.show");
        //this.wrapper.show().addClass('active');
        $(this._WrapperSel).show(500);
    },
    hide: function () {
        console.log("FUNCTION CALL: MapSidebar.hide");
        //this.wrapper.removeClass('active');
        $(this._WrapperSel).hide(500);
    },
    init: function (data) {
        console.log("FUNCTION CALL: MapSidebar.init");
        var devices = data['data'];
        //添加设备
        $('.map-device-list').html('');
        $.each(devices, function (index, d) {
            addDevices(d);
        });
        //分页
        var total = data['total'],
            pagesize = data['pagesize'],
            currpage = data['currpage'];
        paginator(total, pagesize, currpage);
        var hoverTimeout;
        $('.map-device-list li a').on('click', function (e) {
            e.preventDefault();
            //console.log($(this).closest('li').attr('id'));
            $(this).closest('h3').next().toggleClass('on');
        }).hover(function () {
            //$(this).closest('h3').next().slideDown('slow');
            var $this = $(this).closest('h3').next();
            hoverTimeout = setTimeout(function () {
                var lis = $('.map-device-list li div').slideUp('slow');
                $this.slideDown('slow');
            }, 500);
        }, function () {
            clearTimeout(hoverTimeout);
        });
        /*  this.wrapper.on('hover', function (e) {
         $(this).addClass('active');
         });*/

        //添加设备，待补充
        function addDevices(device) {
            //console.log('map sidebar init', device);
            var $li = $('<li id="' + device.ip + '"></li>').appendTo($('.map-device-list'));
            var $title = $('<h3><a href="#">' + device.ip + '</a></h3>').appendTo($li);
            $('#mapa').on('click', function (e) {
                e.preventDefault();
            });

            var $info = $('<div class="well"></div>').appendTo($li);
            var loc = device.location, time = device.timestamp, tags = device.tags, ports = device.ports, portsStr = '', vuls = device.vuls;
            $info.append($('<span>位置：' + loc + '</span><br>'));

            if (ports && ports != '' & ports.length > 0) {
                for (var i = 0; i < ports.length; i++) {
                    for (var key in ports[i]) {
                        portsStr += key + ' '
                    }
                }
            }

            $info.append($('<span>服务：' + portsStr + '</span><br>'));
            var vulsStr = '';
            if (vuls && vuls != '') {
                for (var key in vuls) {
                    vulsStr += key + ' ';
                }
            }
            $info.append($('<span>漏洞：' + vulsStr + '</span><br>'));
            $info.append($('<span>标签：' + tags.join(' ') + '</span><br>'));
        }

        function paginator(totalCounts, pageSize, currentPageNum) {
            $("#map_pager").jqPaginator({
                totalPages: totalCounts,
                visiblePages: 1,
                currentPage: currentPageNum,
                prev: '<li class="prev"><a href="javascript:void(0);"><span class="glyphicon glyphicon-triangle-left"><\/span><\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);"><span class="glyphicon glyphicon-triangle-right"><\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                //page: '<li class="page"><a href="javascript:void(0);"> {{page}} / {{totalPages}} <\/a><\/li>',
                onPageChange: function (n, type) {
                    if (type == 'change') {
                        MyMap.search(n);
                    }
                }
            });
        }
    },
    onSelectionChange: function () {    //用户选择了一个设备的时候，在地图上弹出对应设备的infowindow
        console.log("FUNCTION CALL: MapSidebar.onSelectionChange");
        var selected = map.infoWindow.getSelectedFeature();
        console.log("on selection  change, selected = ", selected);
    }
};