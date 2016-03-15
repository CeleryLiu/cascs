/**
 * @author lyp
 * @date 2016-03-14
 * @module name AnalysisOffline
 * @description 离线统计分析
 */

var AnalysisOffline = {
    charts: {
        globalBar: null,
        countryBar: null,
        countryMap: null,
        typePie: null,
        brandPie: null,
        servicePie: null,
        portPie: null
    },
    init: function () {
        //console.log('AnalysisOffline.init() ======');
        require.config({
            paths: {
                'echarts': getRootPath() + "/resources/plugins/echarts-2.2.7/build/dist"
            }
        });
        require([
            'echarts/echarts',
            'echarts/chart/map',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/funnel',
            'echarts/chart/pie'
        ], function (ec) {
            var basicBarOption = {
                    timeline: {
                        data: [
                            '2015-10-01', '2015-11-01', '2015-12-01', '2016-01-01', '2016-02-01', '2016-03-01',
                            {name: '2016-04-01', symbol: 'star6', symbolSize: 8}
                        ],
                        label: {
                            formatter: function (s) {
                                return s.slice(0, 7);
                            }
                        }, autoPlay: true,
                        playInterval: 2000
                    }
                    /* options: [
                     {
                     title: {
                     'text': '2015-2016年全球设备扫描统计'
                     },
                     tooltip: {'trigger': 'axis'},
                     legend: {
                     x: 'right',
                     'data': ['全球', '中国'],
                     'selected': {
                     '全球': true,
                     '中国': false
                     }
                     },
                     toolbox: {
                     'show': true,
                     orient: 'vertical',
                     x: 'right',
                     y: 'center',
                     'feature': {
                     'mark': {'show': true},
                     'dataView': {'show': true, 'readOnly': false},
                     'magicType': {'show': true, 'type': ['line', 'bar', 'stack', 'tiled']},
                     'restore': {'show': true},
                     'saveAsImage': {'show': true}
                     }
                     },
                     calculable: true,
                     grid: {'y': 80, 'y2': 100},
                     xAxis: [{
                     'type': 'category',
                     'axisLabel': {'interval': 0},
                     'data': [
                     '1号', '\n2号', '3号', '\n4号', '5号', '\n6号', '7号', '\n8号',
                     '9号', '\n10号', '11号', '\n12号', '13号', '\n14号', '15号', '\n16号',
                     '17号', '\n18号', '19号', '\n20号', '21号', '\n22号', '23号', '\n24号',
                     '25号', '\n26号', '27号', '\n28号', '29号', '\n30号', '31号'
                     ]
                     }],
                     yAxis: [
                     {
                     'type': 'value',
                     'name': '全球（个）'
                     },
                     {
                     'type': 'value',
                     'name': '中国（个）'
                     }
                     ],
                     series: [
                     {
                     'name': '全球',
                     'type': 'bar',
                     'markLine': {
                     symbol: ['arrow', 'none'],
                     symbolSize: [4, 2],
                     itemStyle: {
                     normal: {
                     lineStyle: {color: 'orange'},
                     barBorderColor: 'orange',
                     label: {
                     position: 'left',
                     formatter: function (params) {
                     return Math.round(params.value);
                     },
                     textStyle: {color: 'orange'}
                     }
                     }
                     },
                     'data': [{'type': 'average', 'name': '平均值'}]
                     },
                     'data': dataMap.dataGlobal['Mar16']
                     },
                     {
                     'name': '中国', 'yAxisIndex': 1, 'type': 'bar',
                     'data': dataMap.dataChina['Mar16']
                     }
                     ]
                     },
                     {
                     title: {'text': '2015年10月设备扫描统计'},
                     series: [
                     {'data': dataMap.dataGlobal['Oct15']},
                     {'data': dataMap.dataChina['Oct15']}
                     ]
                     },
                     {
                     title: {'text': '2015年11月设备扫描统计'},
                     series: [
                     {'data': dataMap.dataGlobal['Nov15']},
                     {'data': dataMap.dataChina['Nov15']}
                     ]
                     },
                     {
                     title: {'text': '2015年12月设备扫描统计'},
                     series: [
                     {'data': dataMap.dataGlobal['Dec15']},
                     {'data': dataMap.dataChina['Dec15']}
                     ]
                     }, {
                     title: {'text': '2016年01月设备扫描统计'},
                     series: [
                     {'data': dataMap.dataGlobal['Jan16']},
                     {'data': dataMap.dataChina['Jan16']}
                     ]
                     }, {
                     title: {'text': '2016年02月设备扫描统计'},
                     series: [
                     {'data': dataMap.dataGlobal['Feb16']},
                     {'data': dataMap.dataChina['Feb16']}
                     ]
                     }
                     ]*/
                },
                basicPieOption = {
                    title: {
                        text: '设备分布',
                        textStyle: {
                            color: '#ddd'
                        },
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '设备数量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: []
                        }
                    ]
                },
                basicMapOption = {
                    title: {
                        text: '按国家统计',
                        textStyle: {
                            color: '#ddd'
                        },
                        x: 'center',
                        y: 'top'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var value = params.value != '-' ? params.value : 0;
                            return params.name + ' : ' + value;
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    dataRange: {
                        min: 0,
                        max: 99999999,
                        text: ['高', '低'],
                        realtime: false,
                        calculable: true,
                        textStyle: {color: '#ddd'}
                    },
                    series: [
                        {
                            name: '按国家统计',
                            type: 'map',
                            mapType: 'world',
                            roam: true,
                            mapLocation: {
                                y: 60
                            },
                            itemStyle: {
                                emphasis: {label: {show: true}}
                            },
                            nameMap: Constant.echartsNameMap,
                            data: []
                        }
                    ]
                };
            var genSummaryBar = function (chart) {
                return;
                //console.log('AnalysisOffline.genSummary() ======');
                // 初始化参数
                var charts = {
                    'global': {
                        'chart': ec.init(document.getElementById('globalBar')),
                        'title': '设备所在国家分布'
                    },
                    'china': {
                        'chart': ec.init(document.getElementById('chinaBar')),
                        'title': '设备品牌统计'
                    }
                };
                // ajax callback
                var successCallback = function (resp) {
                    var agg = resp['data'][0]['aggregations'], max = 0;
                    for (var key in agg) {
                        // (2)生成data=[{value=10,name:'http'}]
                        var data = $.map(agg[key]['buckets'], function (value) {
                            var count = value['doc_count'];
                            if (max < count) {
                                max = count;
                            }
                            return {
                                'value': count,
                                'name': value['key']
                            }
                        }), option;
                        // (3)生成option={title.text:"xx分布",series[0].data:data}
                        if (key != 'country') {
                            option = basicPieOption;
                        } else {
                            option = basicMapOption;
                            option.dataRange.max = Math.round(max * 1.2);
                        }
                        option.title.text = charts[key]['title'];
                        option.series[0].data = data;
                        // (4)渲染图表
                        charts[key].chart.setOption(option);
                    }
                };
                var errorCallback = function () {
                    console.log("Ajax error!");
                };
                // (1)ajax getting data...............
                LoadData.post({
                    'url': Constant.ANALYSIS_OFFLINE_LATEST_RUL,
                    'success': successCallback,
                    'error': errorCallback,
                    'data': {
                        'size': 1
                    }
                });
            };
            var genLatestCharts = function (ec) {
                // 初始化参数
                var charts = {
                    'country': {
                        'chart': ec.init(document.getElementById('countryMap')),
                        'title': '设备所在国家分布'
                    },
                    'brand': {
                        'chart': ec.init(document.getElementById('brandPie')),
                        'title': '设备品牌统计'
                    },
                    'type': {
                        'chart': ec.init(document.getElementById('typePie')),
                        'title': '设备类型统计'
                    },
                    'service': {
                        'chart': ec.init(document.getElementById('servicePie')),
                        'title': '设备提供的服务统计'
                    },
                    'port': {
                        'chart': ec.init(document.getElementById('portPie')),
                        'title': '设备开放的端口统计'
                    }
                };
                // ajax callback
                var successCallback = function (resp) {
                    console.log(resp);
                    var agg = resp['data'][0]['aggregations'], max = 0;
                    for (var key in agg) {
                        // (2)生成data=[{value=10,name:'http'}]
                        var buckets = agg[key]['buckets'];
                        if (buckets.length < 1) {
                            charts[key].chart.clear();
                            charts[key].chart.dispose();
                            $('section.' + key).hide();
                            continue;
                        }
                        var data = $.map(buckets, function (value) {
                            var count = value['doc_count'];
                            if (max < count) {
                                max = count;
                            }
                            return {
                                'value': count,
                                'name': value['key']
                            }
                        }), option;
                        // (3)生成option={title.text:"xx分布",series[0].data:data}
                        if (key != 'country') {
                            option = basicPieOption;
                        } else {
                            option = basicMapOption;
                            option.dataRange.max = Math.round(max * 1.2);
                        }
                        option.title.text = charts[key]['title'];
                        option.series[0].data = data;
                        // (4)渲染图表
                        charts[key].chart.setOption(option);
                    }
                };
                var errorCallback = function () {
                    console.log("Ajax error!");
                };
                // (1)ajax getting data...............
                LoadData.post({
                    'url': Constant.ANALYSIS_OFFLINE_LATEST_RUL,
                    'success': successCallback,
                    'error': errorCallback,
                    'data': {
                        'size': 1
                    }
                });
            };
            // starts
            genSummaryBar(ec);
            genLatestCharts(ec);
        });
    }
};