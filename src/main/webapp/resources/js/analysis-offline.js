/**
 * @author lyp
 * @date 2016-03-14
 * @module name AnalysisOffline
 * @description 离线统计分析
 */

var AnalysisOffline = {
    charts: {
        globalBar: null,
        globalMap: null,
        countryBar: null,
        countryMap: null,
        countryPie: null,
        typePie: null,
        brandPie: null,
        servicePie: null,
        portPie: null
    },
    init: function () {
        console.log('AnalysisOffline.init() ======');
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
            var genSummary = function (ec) {
                console.log('AnalysisOffline.genSummary() ======');
                var titles = {
                    'globalBar': '全球分布',
                    'globalMap': '全球分布',
                    'countryBar': '中国分布',
                    'countryMap': '中国分布'
                };
                var globalBar = ec.init(document.getElementById('globalBar'));
                //var globalMap = ec.init(document.getElementById('globalMap'));
                //var countryBar = ec.init(document.getElementById('countryBar'));
                //var countryMap = ec.init(document.getElementById('countryMap'));
                var option = {
                    title: {
                        //text: '某站点用户访问来源',
                        textStyle: {
                            color: '#ddd'
                        },
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    /*                    legend: {
                     orient: 'vertical',
                     x: 'left',
                     textStyle: {
                     color: 'auto'
                     },
                     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                     },*/
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
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
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]
                };
                /* // 增加些数据------------------
                 option.legend.data.push('win');
                 option.series.push({
                 'name': 'win',                            // 系列名称
                 'type': 'bar',                           // 图表类型，折线图line、柱状图bar、饼图pie
                 'data': [112, 23, 45, 56, 233, 343, 454, 89, 343, 123, 45, 123]
                 });*/
                globalBar.setOption(option);
            };
            genSummary(ec);
        });
    }
};