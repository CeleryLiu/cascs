/**
 * @author lyp
 * @date 2016-04-05
 * @module name showcase
 * @description
 */
$(function () {
    //1.图表初始化
    var genCharts = function () {
        var dataMapping = {
            'country': '国家',
            'brand': '品牌',
            'type': '类型',
            'service': '服务',
            'port': '端口'
        };
        //高度设置为100%
        $('.full-height').css({
            'height': $(window).height() - 120
        });
        //生成所有扫描数据的统计图（柱状图）
        var genTotalScanChart = function (data, textStatus, jqXHR) {
            console.log(data);
        };
        //$.post('analysis/getNMonthSummary/2', {}, genTotalScanChart);
        $('#scrollcombidy2d').insertFusionCharts({
            'type': 'scrollcombidy2d',
            'width': '100%',
            'height': '100%',
            'dataFormat': 'json',
            'dataSource': {
                'chart': {
                    'caption': '设备扫描结果分类统计',
                    'xAxisname': '日期',
                    'yAxisName': '设备数量',
                    //'plotFillAlpha': '80',
                    'paletteColors': '#8e0000,#1aaf5d,#0075c2',
                    //#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000
                    'baseFontColor': '#ffffff',
                    'baseFont': 'Helvetica Neue,Arial',
                    'captionFontSize': '14',
                    'subcaptionFontSize': '14',
                    'subcaptionFontBold': '0',
                    'showBorder': '0',
                    'bgColor': '#333333',
                    "bgAlpha": "100",
                    'showShadow': '0',
                    'canvasBgColor': '#333333',
                    'canvasBorderAlpha': '0',
                    'divlineAlpha': '100',
                    'divlineColor': '#999999',
                    'divlineThickness': '1',
                    'divLineIsDashed': '1',
                    'divLineDashLen': '1',
                    'divLineGapLen': '1',
                    'usePlotGradientColor': '0',
                    'showplotborder': '0',
                    'valueFontColor': '#ffffff',
                    'placeValuesInside': '1',
                    'showHoverEffect': '1',
                    'rotateValues': '1',
                    'showXAxisLine': '1',
                    'xAxisLineThickness': '1',
                    'xAxisLineColor': '#999999',
                    'showAlternateHGridColor': '0',
                    'legendBgAlpha': '0',
                    'legendBorderAlpha': '0',
                    'legendShadow': '0',
                    'legendItemFontSize': '12',
                    //'legendItemFontColor': '#666666',
                    "showValues": "1",
                    "numVisiblePlot": "12",
                    "flatScrollBars": "1",
                    "scrollheight": "10"
                },
                'categories': [
                    {
                        'category': [
                            {
                                'label': 'Sep 2016'
                            },
                            {
                                'label': 'Oct 2016'
                            },
                            {
                                'label': 'Nov 2016'
                            },
                            {
                                'label': 'Dec 2016'
                            }
                        ]
                    }
                ],
                'dataset': [
                    {
                        'seriesname': '类型1',
                        'data': [
                            {
                                'value': '10000'
                            },
                            {
                                'value': '11500'
                            },
                            {
                                'value': '12500'
                            },
                            {
                                'value': '15000'
                            }
                        ]
                    },
                    {
                        'seriesname': '类型2',
                        'data': [
                            {
                                'value': '25400'
                            },
                            {
                                'value': '29800'
                            },
                            {
                                'value': '21800'
                            },
                            {
                                'value': '26800'
                            }
                        ]
                    },
                    {
                        'seriesname': '类型3',
                        'data': [
                            {
                                'value': '25400'
                            },
                            {
                                'value': '29800'
                            },
                            {
                                'value': '21800'
                            },
                            {
                                'value': '26800'
                            }
                        ]
                    }
                ]
            }
        });
        //2) 生成最近一次扫描的设备统计图（地图和饼状图）
        var genLatestCharts = function (data, textStatus, jqXHR) {
            var genPies = function (obj) {
                var basicPieOption = {
                    'type': 'pie3d',
                    'width': '48%',
                    'height': '400',
                    'dataFormat': 'json',
                    'dataSource': {
                        'chart': {
                            'caption': '',
                            'bgColor': '#333333',
                            'baseFontColor': '#ffffff',
                            'use3DLighting': '0',
                            'showShadow': '1',
                            'enableSmartLabels': '1',
                            'startingAngle': '0',
                            'showPercentValues': '1',
                            'showPercentInTooltip': '1',
                            'decimals': '1',
                            'captionFontSize': '14',
                            'toolTipColor': '#ffffff',
                            'toolTipBorderThickness': '0',
                            'toolTipBgColor': '#000000',
                            'toolTipBgAlpha': '80',
                            'toolTipBorderRadius': '2',
                            'toolTipPadding': '5',
                            "plottooltext": "$label, $value, $percentValue",
                            'showHoverEffect': '1',
                            'showLegend': '0',
                            'legendBgColor': '#ffffff',
                            'legendBorderAlpha': '0',
                            'legendShadow': '0',
                            'legendItemFontSize': '10',
                            'legendItemFontColor': '#666666',
                            'useDataPlotColorForLabels': '1',
                            'enableMultiSlicing': 1,
                            'labelDistance':"20"
                        },
                        'data': []
                    }
                };
                var basicMapOption = {
                    type: 'maps/worldwithcountries',
                    width: '100%',
                    height: '100%',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "",
                            "theme": "fint",
                            "bgColor": "#333333",
                            "bgAlpha": "100",
                            'baseFontColor': '#ffffff',
                            "formatNumberScale": "0",
                            "nullEntityColor": "#C2C2D6",
                            "nullEntityAlpha": "50",
                            "hoverOnNull": "0",
                            "showLabels": "0"
                        },
                        "colorrange": {
                            "minvalue": "0",
                            //"startlabel": "Low",
                            //"endlabel": "High",
                            "code": "#FF4411",
                            "gradient": "1",
                            "color": [{
                                "maxvalue": "500000",
                                "code": "#6baa01"
                                //"displayValue": "Median"
                            }, {
                                "maxvalue": "2000000",
                                "code": "#FFDD44"
                            }]
                        },
                        "data": []
                    }
                };
                var $pies = $('#pie3Ds'), $map = $('#map');
                for (var key in obj) {
                    if (key == 'country') {
                        var mapOpt = $.extend(true, {}, basicMapOption);
                        var maxvalue = obj[key]['max'];
                        mapOpt.dataSource.chart.caption = dataMapping[key];
                        mapOpt.dataSource.data = obj[key]['data'];
                        mapOpt.dataSource.colorrange.color[0].maxvalue = maxvalue / 2;
                        mapOpt.dataSource.colorrange.color[1].maxvalue = maxvalue;
                        $map.insertFusionCharts(mapOpt);
                    } else{
                        var opt = $.extend(true, {}, basicPieOption);//$.extend(true,{}, json);//深克隆
                        opt.dataSource.chart.caption = dataMapping[key];
                        opt.dataSource.data = obj[key]['data'];
                        $pies.appendFusionCharts(opt);
                    }
                }
            };
            genPies(data.data);
            /*$('#multilevelpie').insertFusionCharts({
             type: 'multilevelpie',
             width: '400',
             height: '400',
             dataFormat: 'json',
             dataSource: {
             "chart": {
             "caption": "xxxxxxxxx",
             "showPlotBorder": "1",
             "piefillalpha": "60",
             "pieborderthickness": "2",
             "piebordercolor": "#FFFFFF",
             "hoverfillcolor": "#CCCCCC",
             'bgColor': '#333333',
             "bgAlpha": "100",
             "numberprefix": "$",
             'baseFontColor': '#ffffff',
             "plottooltext": "$label, $$valueK, $percentValue",
             "theme": "fint"
             },
             "category": [{
             "label": "Products",
             "color": "#ffffff",
             "value": "150",
             "category": [{
             "label": "Food & {br}Beverages",
             "color": "#f8bd19",
             "value": "55.5",
             "tooltext": "Food & Beverages, $$valueK, $percentValue",
             "category": [{
             "label": "Breads",
             "color": "#f8bd19",
             "value": "11.1"
             }, {
             "label": "Juice",
             "color": "#f8bd19",
             "value": "27.75"
             }, {
             "label": "Noodles",
             "color": "#f8bd19",
             "value": "9.99"
             }, {
             "label": "Seafood",
             "color": "#f8bd19",
             "value": "6.66"
             }]
             }, {
             "label": "Apparel &{br}Accessories",
             "color": "#33ccff",
             "value": "42",
             "tooltext": "Apparel & Accessories, $$valueK, $percentValue",
             "category": [{
             "label": "Sun Glasses",
             "color": "#33ccff",
             "value": "10.08"
             }, {
             "label": "Clothing",
             "color": "#33ccff",
             "value": "18.9"
             }, {
             "label": "Handbags",
             "color": "#33ccff",
             "value": "6.3"
             }, {
             "label": "Shoes",
             "color": "#33ccff",
             "value": "6.72"
             }]
             }, {
             "label": "Baby {br}Products",
             "color": "#ffcccc",
             "value": "22.5",
             "tooltext": "Baby Products, $$valueK, $percentValue",
             "category": [{
             "label": "Bath &{br}Grooming",
             "color": "#ffcccc",
             "value": "9.45",
             "tooltext": "Bath & Grooming, $$valueK, $percentValue"
             }, {
             "label": "Food",
             "color": "#ffcccc",
             "value": "6.3"
             }, {
             "label": "Diapers",
             "color": "#ffcccc",
             "value": "6.75"
             }]
             }, {
             "label": "Electronics",
             "color": "#ccff66",
             "value": "30",
             "category": [{
             "label": "Laptops",
             "color": "#ccff66",
             "value": "8.1"
             }, {
             "label": "Televisions",
             "color": "#ccff66",
             "value": "10.5"
             }, {
             "label": "SmartPhones",
             "color": "#ccff66",
             "value": "11.4"
             }]
             }]
             }]
             }
             });*///按类型>品牌
        };
        $.ajax({
            url: 'statistic/getLatestData',
            type: 'post',
            data: {
                size: 1
            },
            contentType: "application/json",
            dataType: "json",
            //timeout: 10000,
            success: genLatestCharts
        });
    };
    genCharts();
    //2.全屏滚动初始化
    $('#pagewrapper').fullpage({
        anchors: ['system', 'charts', 'videos'],
        navigation: true,
        navigationPosition: 'right',
        scrollOverflow: true,
        animateAnchor: false,
        //autoScrolling: false,
        //recordHistory: true,
        resize: true,
        verticalCentered: false,
        //normalScrollElements:'#page2',
        //events
        onLeave: function (index, nextIndex, direction) {
        },
        afterLoad: function (anchorLink, index) {
        },
        afterRender: function () {
            //$.fn.fullpage.reBuild();
        },
        afterResize: function () {
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
        }
    });
    //3. 视频墙初始化
    //4. 界面动画初始化
    var animateAll = function () {
        function waveAnimate() {
            var tag = $(".wavewarp");
            tag.scrollLeft(tag.scrollLeft() + 1);
            setTimeout(waveAnimate, 200)
        }

        waving();
        function waving() {
            $(".page_1").addClass("animate")
        }

        function SiriWave(opt) {
            this.opt = opt || {};
            this.K = 1;
            this.F = 15;
            this.speed = this.opt.speed || 0.1;
            this.noise = this.opt.noise || 30;
            this.phase = this.opt.phase || 0;
            if (!window.devicePixelRatio) {
                devicePixelRatio = 1
            }
            this.width = devicePixelRatio * (this.opt.width || 320);
            this.height = devicePixelRatio * (this.opt.height || 100);
            this.MAX = (this.height / 2) - 4;
            this.canvas = $("#wave")[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.style.width = (this.width / devicePixelRatio) + "px";
            this.canvas.style.height = (this.height / devicePixelRatio) + "px";
            this.ctx = this.canvas.getContext("2d");
            this.run = false
        }

        SiriWave.prototype = {
            _globalAttenuationFn: function (x) {
                return Math.pow(this.K * 4 / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
            }, _drawLine: function (attenuation, color, width, noise, F) {
                this.ctx.moveTo(0, 0);
                this.ctx.beginPath();
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = width || 1;
                var x, y;
                F = F || this.F;
                noise = noise * this.MAX || this.noise;
                for (var i = -this.K; i <= this.K; i += 0.01) {
                    i = parseFloat(parseFloat(i).toFixed(2));
                    x = this.width * ((i + this.K) / (this.K * 2));
                    y = this.height / 2 + noise * Math.pow(Math.sin(i * 10 * attenuation), 1) * Math.sin(F * i - this.phase);
                    this.ctx.lineTo(x, y)
                }
                this.ctx.lineTo(this.width, this.height);
                this.ctx.lineTo(0, this.height);
                this.ctx.fillStyle = color;
                this.ctx.fill()
            }, _clear: function () {
                this.ctx.globalCompositeOperation = "destination-out";
                this.ctx.fillRect(0, 0, this.width, this.height);
                this.ctx.globalCompositeOperation = "source-over"
            }, _draw: function () {
                if (!this.run) {
                    return
                }
                this.phase = (this.phase + this.speed) % (Math.PI * 64);
                this._clear();
                this._drawLine(0.5, "rgba(120,255,212,0.5)", 1, 0.35, 6);
                this._drawLine(1, "rgba(0,188,62,0.5)", 1, 0.25, 6);
                clearAnimationFrame = requestAnimationFrame(this._draw.bind(this), 1000)
            }, start: function () {
                this.phase = 0;
                this.run = true;
                this._draw()
            }, stop: function () {
                this.run = false;
                this._clear()
            }, setNoise: function (v) {
                this.noise = Math.min(v, 1) * this.MAX
            }, setSpeed: function (v) {
                this.speed = v
            }, set: function (noise, speed) {
                this.setNoise(noise);
                this.setSpeed(speed)
            }, bl: function (val) {
                return 1920 / 15
            }
        };
        var SW = new SiriWave({width: $(window).width(), height: 200, container: $(".wavewarp")[1]});
        SW.setSpeed(0.01);
        SW.start();
    };
    //animateAll();
});