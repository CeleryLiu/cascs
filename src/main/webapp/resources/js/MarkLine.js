/*
 * Created by lyp on 2016/2/26.
 * Author: lyp
 * Date: 2016/2/26
 * Description: 3维地图上的数据探测包发送与接收展示
 * Version: V1.0 
 */
var MarkLine = {
    _stop: false,
    _timeout: '',
    init: function () {
        console.log('Inside MarkLine.init() ======');
        var rootPath = getRootPath();

        var pageId = Math.round(Math.random() * 10),
            chart,
            URL = rootPath + '/api/getAllMarkLinesViaAjax?pageId=',
            COLOR = {
                "weak_pass": "#ff7f50",
                "vul_scan": "#87cefa",
                "port_scan": "#da70d6",
                "others": "#32cd32"
            };
        require.config({
            paths: {
                'echarts': rootPath + "/resources/plugins/echarts-2.2.7/build/dist",
                'echarts-x': rootPath + "/resources/plugins/echarts-x/build/dist"
            }
        });
        require([
                'echarts/echarts',
                'echarts/chart/map',
                'echarts-x/echarts-x',
                'echarts-x/chart/map3d'
            ],
            function (ec) {
                var initGlobe = function () {
                    var initOpts = {
                        tooltip: {
                            formatter: '{b}'
                        },
                        series: [
                            {
                                type: 'map3d',
                                mapType: 'world',
                                selectedMode: 'single',
                                baseLayer: {
                                    backgroundColor: '',
                                    backgroundImage: rootPath + '/resources/img/earth.jpg',
                                    quality: 'high'
                                },
                                light: {
                                    show: true,
                                    sunIntensity: 1,
                                    ambientIntensity: 0.4
                                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: 1,
                                        borderColor: 'yellow',
                                        areaStyle: {
                                            color: 'rgba(0, 0, 0, 0)'
                                        }
                                    }
                                },
                                autoRotate: true
                            }, {//添加这个数据是为了不出现loading画面，因为必须有数据才可以正常显示，这里只是一个虚拟的点
                                type: 'map3d',
                                name: "nowhere",
                                markPoint: {
                                    effect: {
                                        show: false //不显示这个点
                                    },
                                    data: [
                                        {
                                            geoCoord: []
                                        }
                                    ]
                                }
                            }
                        ]
                    };
                    chart.setOption(initOpts);
                };
                var SetMapOption = function (chart, url) {
                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        dataType: 'json',
                        timeout: 100000,
                        url: url
                    })
                        .success(function (response) {
                            if (response.statuscode == 200) {
                                var data = response.data;
                                //devices
                                var markPointStyle = {          //设备的样式
                                    normal: {
                                        color: 'red'
                                    }
                                };
                                var devices = [];
                                $.each(data.points, function (key, value) {
                                    devices.push({
                                        itemStyle: markPointStyle,
                                        geoCoord: value
                                    })
                                });

                                //types
                                var types = [];
                                $.each(data.lineTypes, function (key, value) {
                                    types.push(key);
                                    //types.push(value);
                                });

                                //lines
                                var lineGroupByScanType = {};

                                data.lines.forEach(function (line) {
                                    var typeName = line.type_name;
                                    if (!lineGroupByScanType[typeName]) {
                                        lineGroupByScanType[typeName] = [];
                                    }
                                    lineGroupByScanType[typeName].push(line);
                                });

                                var opts = {
                                    /*  title: {
                                     text: '设备探测',
                                     subtext: 'Data from openflights.org',
                                     sublink: 'http://openflights.org/data.html',
                                     x: 'center',
                                     y: 'top',
                                     textStyle: {
                                     color: 'white'
                                     }
                                     },*/
                                    legend: {
                                        show: true,
                                        data: types.map(function (item) {
                                            return item;
                                        }),
                                        selected: {},
                                        x: 'left',
                                        orient: 'vertical',
                                        textStyle: {
                                            color: 'white'
                                        }
                                    },
                                    tooltip: {
                                        formatter: '{b}'
                                    },
                                    series: [
                                        {
                                            type: 'map3d',
                                            mapType: 'world',
                                            baseLayer: {
                                                backgroundColor: '',
                                                backgroundImage: rootPath + '/resources/img/earth.jpg'
                                            },
                                            itemStyle: {
                                                normal: {
                                                    borderWidth: 0.5,
                                                    borderColor: 'yellow',
                                                    areaStyle: {
                                                        color: 'rgba(0, 0, 0, 0)'
                                                    }
                                                }
                                            },
                                            markPoint: {
                                                effect: {
                                                    show: true
                                                },
                                                large: true,
                                                symbolSize: 5,
                                                data: devices
                                            }
                                        }]
                                };

                                opts.legend.data.forEach(function (name) {

                                    if (name.indexOf('port_scan') >= 0) {
                                        opts.legend.selected[name] = true;
                                    } else {
                                        opts.legend.selected[name] = true;
                                    }
                                });

                                types.forEach(function (item) {
                                    var color = COLOR[item] == undefined ? COLOR['others'] : COLOR[item];
                                    var lines = lineGroupByScanType[item];
                                    if (lines) {
                                        opts.series.push({
                                            type: 'map3d',
                                            name: item,
                                            markLine: {
                                                smooth: true,
                                                effect: {
                                                    show: true,
                                                    scaleSize: 3
                                                },
                                                //large: true,
                                                itemStyle: {
                                                    normal: {
                                                        color: color,
                                                        borderWidth: 2,
                                                        width: 4,
                                                        opacity: 1
                                                    }
                                                },
                                                data: lines.map(function (line) {
                                                    return [{
                                                        geoCoord: line.startGeo // Source
                                                    }, {
                                                        geoCoord: line.endGeo // Destination
                                                    }]
                                                })
                                            }
                                        });
                                    }
                                });
                                chart.setOption(opts);
                                //chart.hideLoading();
                                chart.getOption().legend.data.forEach(function (name) {
                                    chart.component.legend.setColor(name, COLOR[name]);
                                });
                                chart.refresh();
                            } else if (response.statuscode == 204) {
                                pageId = 1;
                                console.log("errmsg", response.errmsg);
                            } else {
                                console.log("statuscode = " + response['statuscode'], "errmsg = " + response['errmsg']);
                            }
                        }).fail(function (f) {
                            console.log("Ajax failed!", f);
                        }).done(function (d) {

                        }).error(function (e) {
                            console.log("Ajax error!", e);
                        });
                };

                chart = ec.init(document.getElementById('globe4LineHolder'));
                //var url = rootPath + 'api/getAllMarkLinesViaAjax?from=' + from + '&to=' + to;
                initGlobe();
                SetMapOption(chart, URL + pageId);
            });
    },
    destroy: function () {
        console.log('Inside MarkLine.destroy() ======');
        this._stop = true;
        clearTimeout(this._timeout);
    }
};