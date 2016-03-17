/**
 * @author lyp
 * @date 2016-03-14
 * @module name AnalysisOffline
 * @description 离线统计分析
 */
var resp = {
    data: {
        dataMap: {
            "data0Global": {
                "2015-10": [
                    {"name": "北京", "value": 4315}, {"name": "天津", "value": 2150.76}, {
                        "name": "河北",
                        "value": 6018.28
                    }, {"name": "山西", "value": 2324.8}, {"name": "内蒙古", "value": 1940.94}, {
                        "name": "辽宁",
                        "value": 5458.22
                    }, {
                        "name": "吉林",
                        "value": 2348.54
                    }, {"name": "黑龙江", "value": 3637.2}, {"name": "上海", "value": 5741.03}, {
                        "name": "江苏",
                        "value": 10606.85
                    }, {
                        "name": "浙江",
                        "value": 8003.67
                    }, {"name": "安徽", "value": 3519.72}, {"name": "福建", "value": 4467.55}, {
                        "name": "江西",
                        "value": 2450.48
                    }, {
                        "name": "山东",
                        "value": 10275.5
                    }, {"name": "河南", "value": 6035.48}, {"name": "湖北", "value": 4212.82}, {
                        "name": "湖南",
                        "value": 4151.54
                    }, {
                        "name": "广东",
                        "value": 13502.42
                    }, {"name": "广西", "value": 2523.73}, {"name": "海南", "value": 642.73}, {
                        "name": "重庆",
                        "value": 2232.86
                    }, {
                        "name": "四川",
                        "value": 4725.01
                    }, {"name": "贵州", "value": 1243.43}, {"name": "云南", "value": 2312.82}, {
                        "name": "西藏",
                        "value": 162.04
                    }, {
                        "name": "陕西",
                        "value": 2253.39
                    }, {"name": "甘肃", "value": 1232.03}, {"name": "青海", "value": 340.65}, {
                        "name": "宁夏",
                        "value": 377.16
                    }, {
                        "name": "新疆",
                        "value": 1612.6
                    }],
                "2015-11": [
                    {"name": "北京", "value": 5007.21}, {"name": "天津", "value": 2578.03}, {
                        "name": "河北",
                        "value": 6921.29
                    }, {"name": "山西", "value": 2855.23}, {"name": "内蒙古", "value": 2388.38}, {
                        "name": "辽宁",
                        "value": 6002.54
                    }, {"name": "吉林", "value": 2662.08}, {"name": "黑龙江", "value": 4057.4}, {
                        "name": "上海",
                        "value": 6694.23
                    }, {"name": "江苏", "value": 12442.87}, {"name": "浙江", "value": 9705.02}, {
                        "name": "安徽",
                        "value": 3923.11
                    }, {"name": "福建", "value": 4983.67}, {"name": "江西", "value": 2807.41}, {
                        "name": "山东",
                        "value": 12078.15
                    }, {"name": "河南", "value": 6867.7}, {"name": "湖北", "value": 4757.45}, {
                        "name": "湖南",
                        "value": 4659.99
                    }, {"name": "广东", "value": 15844.64}, {"name": "广西", "value": 2821.11}, {
                        "name": "海南",
                        "value": 713.96
                    }, {"name": "重庆", "value": 2555.72}, {"name": "四川", "value": 5333.09}, {
                        "name": "贵州",
                        "value": 1426.34
                    }, {"name": "云南", "value": 2556.02}, {"name": "西藏", "value": 185.09}, {
                        "name": "陕西",
                        "value": 2587.72
                    }, {"name": "甘肃", "value": 1399.83}, {"name": "青海", "value": 390.2}, {
                        "name": "宁夏",
                        "value": 445.36
                    }, {
                        "name": "新疆",
                        "value": 1886.35
                    }],
                "2015-12": [
                    {"name": "北京", "value": 6033.21}, {"name": "天津", "value": 3110.97}, {
                        "name": "河北",
                        "value": 8477.63
                    }, {"name": "山西", "value": 3571.37}, {"name": "内蒙古", "value": 3041.07}, {
                        "name": "辽宁",
                        "value": 6672
                    }, {"name": "吉林", "value": 3122.01}, {"name": "黑龙江", "value": 4750.6}, {
                        "name": "上海",
                        "value": 8072.83
                    }, {"name": "江苏", "value": 15003.6}, {"name": "浙江", "value": 11648.7}, {
                        "name": "安徽",
                        "value": 4759.3
                    }, {"name": "福建", "value": 5763.35}, {"name": "江西", "value": 3456.7}, {
                        "name": "山东",
                        "value": 15021.84
                    }, {"name": "河南", "value": 8553.79}, {"name": "湖北", "value": 5633.24}, {
                        "name": "湖南",
                        "value": 5641.94
                    }, {"name": "广东", "value": 18864.62}, {"name": "广西", "value": 3433.5}, {
                        "name": "海南",
                        "value": 819.66
                    }, {"name": "重庆", "value": 3034.58}, {"name": "四川", "value": 6379.63}, {
                        "name": "贵州",
                        "value": 1677.8
                    }, {"name": "云南", "value": 3081.91}, {"name": "西藏", "value": 220.34}, {
                        "name": "陕西",
                        "value": 3175.58
                    }, {"name": "甘肃", "value": 1688.49}, {"name": "青海", "value": 466.1}, {
                        "name": "宁夏",
                        "value": 537.11
                    }, {
                        "name": "新疆",
                        "value": 2209.09
                    }],
                "2016-01": [
                    {"name": "北京", "value": 6969.52}, {"name": "天津", "value": 3905.64}, {
                        "name": "河北",
                        "value": 10012.11
                    }, {"name": "山西", "value": 4230.53}, {"name": "内蒙古", "value": 3905.03}, {
                        "name": "辽宁",
                        "value": 8047.26
                    }, {"name": "吉林", "value": 3620.27}, {"name": "黑龙江", "value": 5513.7}, {
                        "name": "上海",
                        "value": 9247.66
                    }, {"name": "江苏", "value": 18598.69}, {"name": "浙江", "value": 13417.68}, {
                        "name": "安徽",
                        "value": 5350.17
                    }, {"name": "福建", "value": 6554.69}, {"name": "江西", "value": 4056.76}, {
                        "name": "山东",
                        "value": 18366.87
                    }, {"name": "河南", "value": 10587.42}, {"name": "湖北", "value": 6590.19}, {
                        "name": "湖南",
                        "value": 6596.1
                    }, {"name": "广东", "value": 22557.37}, {"name": "广西", "value": 3984.1}, {
                        "name": "海南",
                        "value": 918.75
                    }, {"name": "重庆", "value": 3467.72}, {"name": "四川", "value": 7385.1}, {
                        "name": "贵州",
                        "value": 2005.42
                    }, {"name": "云南", "value": 3462.73}, {"name": "西藏", "value": 248.8}, {
                        "name": "陕西",
                        "value": 3933.72
                    }, {"name": "甘肃", "value": 1933.98}, {"name": "青海", "value": 543.32}, {
                        "name": "宁夏",
                        "value": 612.61
                    }, {"name": "新疆", "value": 2604.19}],
                "2016-02": [
                    {"name": "北京", "value": 8117.78}, {"name": "天津", "value": 4462.74}, {
                        "name": "河北",
                        "value": 11467.6
                    }, {"name": "山西", "value": 4878.61}, {"name": "内蒙古", "value": 4944.25}, {
                        "name": "辽宁",
                        "value": 9304.52
                    }, {"name": "吉林", "value": 4275.12}, {"name": "黑龙江", "value": 6211.8}, {
                        "name": "上海",
                        "value": 10572.24
                    }, {"name": "江苏", "value": 21742.05}, {"name": "浙江", "value": 15718.47}, {
                        "name": "安徽",
                        "value": 6112.5
                    }, {"name": "福建", "value": 7583.85}, {"name": "江西", "value": 4820.53}, {
                        "name": "山东",
                        "value": 21900.19
                    }, {"name": "河南", "value": 12362.79}, {"name": "湖北", "value": 7617.47}, {
                        "name": "湖南",
                        "value": 7688.67
                    }, {"name": "广东", "value": 26587.76}, {"name": "广西", "value": 4746.16}, {
                        "name": "海南",
                        "value": 1065.67
                    }, {"name": "重庆", "value": 3907.23}, {"name": "四川", "value": 8690.24}, {
                        "name": "贵州",
                        "value": 2338.98
                    }, {"name": "云南", "value": 3988.14}, {"name": "西藏", "value": 290.76}, {
                        "name": "陕西",
                        "value": 4743.61
                    }, {"name": "甘肃", "value": 2277.35}, {"name": "青海", "value": 648.5}, {
                        "name": "宁夏",
                        "value": 725.9
                    }, {
                        "name": "新疆",
                        "value": 3045.26
                    }],
                "2016-03": [
                    {"name": "北京", "value": 9846.81},
                    {"name": "天津", "value": 5252.76},
                    {"name": "河北", "value": 13607.32},
                    {"name": "山西", "value": 6024.45}, {"name": "内蒙古", "value": 6423.18}, {
                        "name": "辽宁",
                        "value": 11164.3
                    }, {"name": "吉林", "value": 5284.69}, {"name": "黑龙江", "value": 7104}, {
                        "name": "上海",
                        "value": 12494.01
                    }, {"name": "江苏", "value": 26018.48}, {"name": "浙江", "value": 18753.73}, {
                        "name": "安徽",
                        "value": 7360.92
                    }, {"name": "福建", "value": 9248.53}, {"name": "江西", "value": 5800.25}, {
                        "name": "山东",
                        "value": 25776.91
                    }, {"name": "河南", "value": 15012.46}, {"name": "湖北", "value": 9333.4}, {
                        "name": "湖南",
                        "value": 9439.6
                    }, {"name": "广东", "value": 31777.01}, {"name": "广西", "value": 5823.41}, {
                        "name": "海南",
                        "value": 1254.17
                    }, {"name": "重庆", "value": 4676.13}, {"name": "四川", "value": 10562.39}, {
                        "name": "贵州",
                        "value": 2884.11
                    }, {"name": "云南", "value": 4772.52}, {"name": "西藏", "value": 341.43}, {
                        "name": "陕西",
                        "value": 5757.29
                    }, {"name": "甘肃", "value": 2703.98}, {"name": "青海", "value": 797.35}, {
                        "name": "宁夏",
                        "value": 919.11
                    }, {"name": "新疆", "value": 3523.16}]
            },
            "data0China": {
                "2015-10": [
                    {"name": "北京", "value": 4315}, {"name": "天津", "value": 2150.76}, {
                        "name": "河北",
                        "value": 6018.28
                    }, {"name": "山西", "value": 2324.8}, {"name": "内蒙古", "value": 1940.94}, {
                        "name": "辽宁",
                        "value": 5458.22
                    }, {
                        "name": "吉林",
                        "value": 2348.54
                    }, {"name": "黑龙江", "value": 3637.2}, {"name": "上海", "value": 5741.03}, {
                        "name": "江苏",
                        "value": 10606.85
                    }, {
                        "name": "浙江",
                        "value": 8003.67
                    }, {"name": "安徽", "value": 3519.72}, {"name": "福建", "value": 4467.55}, {
                        "name": "江西",
                        "value": 2450.48
                    }, {
                        "name": "山东",
                        "value": 10275.5
                    }, {"name": "河南", "value": 6035.48}, {"name": "湖北", "value": 4212.82}, {
                        "name": "湖南",
                        "value": 4151.54
                    }, {
                        "name": "广东",
                        "value": 13502.42
                    }, {"name": "广西", "value": 2523.73}, {"name": "海南", "value": 642.73}, {
                        "name": "重庆",
                        "value": 2232.86
                    }, {
                        "name": "四川",
                        "value": 4725.01
                    }, {"name": "贵州", "value": 1243.43}, {"name": "云南", "value": 2312.82}, {
                        "name": "西藏",
                        "value": 162.04
                    }, {
                        "name": "陕西",
                        "value": 2253.39
                    }, {"name": "甘肃", "value": 1232.03}, {"name": "青海", "value": 340.65}, {
                        "name": "宁夏",
                        "value": 377.16
                    }, {
                        "name": "新疆",
                        "value": 1612.6
                    }],
                "2015-11": [
                    {"name": "北京", "value": 5007.21}, {"name": "天津", "value": 2578.03}, {
                        "name": "河北",
                        "value": 6921.29
                    }, {"name": "山西", "value": 2855.23}, {"name": "内蒙古", "value": 2388.38}, {
                        "name": "辽宁",
                        "value": 6002.54
                    }, {"name": "吉林", "value": 2662.08}, {"name": "黑龙江", "value": 4057.4}, {
                        "name": "上海",
                        "value": 6694.23
                    }, {"name": "江苏", "value": 12442.87}, {"name": "浙江", "value": 9705.02}, {
                        "name": "安徽",
                        "value": 3923.11
                    }, {"name": "福建", "value": 4983.67}, {"name": "江西", "value": 2807.41}, {
                        "name": "山东",
                        "value": 12078.15
                    }, {"name": "河南", "value": 6867.7}, {"name": "湖北", "value": 4757.45}, {
                        "name": "湖南",
                        "value": 4659.99
                    }, {"name": "广东", "value": 15844.64}, {"name": "广西", "value": 2821.11}, {
                        "name": "海南",
                        "value": 713.96
                    }, {"name": "重庆", "value": 2555.72}, {"name": "四川", "value": 5333.09}, {
                        "name": "贵州",
                        "value": 1426.34
                    }, {"name": "云南", "value": 2556.02}, {"name": "西藏", "value": 185.09}, {
                        "name": "陕西",
                        "value": 2587.72
                    }, {"name": "甘肃", "value": 1399.83}, {"name": "青海", "value": 390.2}, {
                        "name": "宁夏",
                        "value": 445.36
                    }, {
                        "name": "新疆",
                        "value": 1886.35
                    }],
                "2015-12": [
                    {"name": "北京", "value": 6033.21}, {"name": "天津", "value": 3110.97}, {
                        "name": "河北",
                        "value": 8477.63
                    }, {"name": "山西", "value": 3571.37}, {"name": "内蒙古", "value": 3041.07}, {
                        "name": "辽宁",
                        "value": 6672
                    }, {"name": "吉林", "value": 3122.01}, {"name": "黑龙江", "value": 4750.6}, {
                        "name": "上海",
                        "value": 8072.83
                    }, {"name": "江苏", "value": 15003.6}, {"name": "浙江", "value": 11648.7}, {
                        "name": "安徽",
                        "value": 4759.3
                    }, {"name": "福建", "value": 5763.35}, {"name": "江西", "value": 3456.7}, {
                        "name": "山东",
                        "value": 15021.84
                    }, {"name": "河南", "value": 8553.79}, {"name": "湖北", "value": 5633.24}, {
                        "name": "湖南",
                        "value": 5641.94
                    }, {"name": "广东", "value": 18864.62}, {"name": "广西", "value": 3433.5}, {
                        "name": "海南",
                        "value": 819.66
                    }, {"name": "重庆", "value": 3034.58}, {"name": "四川", "value": 6379.63}, {
                        "name": "贵州",
                        "value": 1677.8
                    }, {"name": "云南", "value": 3081.91}, {"name": "西藏", "value": 220.34}, {
                        "name": "陕西",
                        "value": 3175.58
                    }, {"name": "甘肃", "value": 1688.49}, {"name": "青海", "value": 466.1}, {
                        "name": "宁夏",
                        "value": 537.11
                    }, {
                        "name": "新疆",
                        "value": 2209.09
                    }],
                "2016-01": [
                    {"name": "北京", "value": 6969.52}, {"name": "天津", "value": 3905.64}, {
                        "name": "河北",
                        "value": 10012.11
                    }, {"name": "山西", "value": 4230.53}, {"name": "内蒙古", "value": 3905.03}, {
                        "name": "辽宁",
                        "value": 8047.26
                    }, {"name": "吉林", "value": 3620.27}, {"name": "黑龙江", "value": 5513.7}, {
                        "name": "上海",
                        "value": 9247.66
                    }, {"name": "江苏", "value": 18598.69}, {"name": "浙江", "value": 13417.68}, {
                        "name": "安徽",
                        "value": 5350.17
                    }, {"name": "福建", "value": 6554.69}, {"name": "江西", "value": 4056.76}, {
                        "name": "山东",
                        "value": 18366.87
                    }, {"name": "河南", "value": 10587.42}, {"name": "湖北", "value": 6590.19}, {
                        "name": "湖南",
                        "value": 6596.1
                    }, {"name": "广东", "value": 22557.37}, {"name": "广西", "value": 3984.1}, {
                        "name": "海南",
                        "value": 918.75
                    }, {"name": "重庆", "value": 3467.72}, {"name": "四川", "value": 7385.1}, {
                        "name": "贵州",
                        "value": 2005.42
                    }, {"name": "云南", "value": 3462.73}, {"name": "西藏", "value": 248.8}, {
                        "name": "陕西",
                        "value": 3933.72
                    }, {"name": "甘肃", "value": 1933.98}, {"name": "青海", "value": 543.32}, {
                        "name": "宁夏",
                        "value": 612.61
                    }, {"name": "新疆", "value": 2604.19}],
                "2016-02": [
                    {"name": "北京", "value": 8117.78}, {"name": "天津", "value": 4462.74}, {
                        "name": "河北",
                        "value": 11467.6
                    }, {"name": "山西", "value": 4878.61}, {"name": "内蒙古", "value": 4944.25}, {
                        "name": "辽宁",
                        "value": 9304.52
                    }, {"name": "吉林", "value": 4275.12}, {"name": "黑龙江", "value": 6211.8}, {
                        "name": "上海",
                        "value": 10572.24
                    }, {"name": "江苏", "value": 21742.05}, {"name": "浙江", "value": 15718.47}, {
                        "name": "安徽",
                        "value": 6112.5
                    }, {"name": "福建", "value": 7583.85}, {"name": "江西", "value": 4820.53}, {
                        "name": "山东",
                        "value": 21900.19
                    }, {"name": "河南", "value": 12362.79}, {"name": "湖北", "value": 7617.47}, {
                        "name": "湖南",
                        "value": 7688.67
                    }, {"name": "广东", "value": 26587.76}, {"name": "广西", "value": 4746.16}, {
                        "name": "海南",
                        "value": 1065.67
                    }, {"name": "重庆", "value": 3907.23}, {"name": "四川", "value": 8690.24}, {
                        "name": "贵州",
                        "value": 2338.98
                    }, {"name": "云南", "value": 3988.14}, {"name": "西藏", "value": 290.76}, {
                        "name": "陕西",
                        "value": 4743.61
                    }, {"name": "甘肃", "value": 2277.35}, {"name": "青海", "value": 648.5}, {
                        "name": "宁夏",
                        "value": 725.9
                    }, {
                        "name": "新疆",
                        "value": 3045.26
                    }],
                "2016-03": [
                    {"name": "北京", "value": 9846.81}, {"name": "天津", "value": 5252.76}, {
                        "name": "河北",
                        "value": 13607.32
                    }, {"name": "山西", "value": 6024.45}, {"name": "内蒙古", "value": 6423.18}, {
                        "name": "辽宁",
                        "value": 11164.3
                    }, {"name": "吉林", "value": 5284.69}, {"name": "黑龙江", "value": 7104}, {
                        "name": "上海",
                        "value": 12494.01
                    }, {"name": "江苏", "value": 26018.48}, {"name": "浙江", "value": 18753.73}, {
                        "name": "安徽",
                        "value": 7360.92
                    }, {"name": "福建", "value": 9248.53}, {"name": "江西", "value": 5800.25}, {
                        "name": "山东",
                        "value": 25776.91
                    }, {"name": "河南", "value": 15012.46}, {"name": "湖北", "value": 9333.4}, {
                        "name": "湖南",
                        "value": 9439.6
                    }, {"name": "广东", "value": 31777.01}, {"name": "广西", "value": 5823.41}, {
                        "name": "海南",
                        "value": 1254.17
                    }, {"name": "重庆", "value": 4676.13}, {"name": "四川", "value": 10562.39}, {
                        "name": "贵州",
                        "value": 2884.11
                    }, {"name": "云南", "value": 4772.52}, {"name": "西藏", "value": 341.43}, {
                        "name": "陕西",
                        "value": 5757.29
                    }, {"name": "甘肃", "value": 2703.98}, {"name": "青海", "value": 797.35}, {
                        "name": "宁夏",
                        "value": 919.11
                    }, {"name": "新疆", "value": 3523.16}]
                /*                ,
                 "2015-10max": 13500,
                 "2015-11max": 15800,
                 "2015-12max": 18800,
                 "2016-01max": 22500,
                 "2016-02max": 26500,
                 "2016-03max": 31700*/
            }
        },
        dataTimeline: ["2015-10", "2015-11", "2015-12", "2016-01", "2016-02", "2016-03"]
    }
};
var AnalysisOffline = {
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
                // 初始化参数
                var charts = {
                    'summary': {
                        'chart': ec.init(document.getElementById('summaryChart')),
                        'title': '设备扫描统计'
                    },
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
                var textStyle = {
                        color: '#eee'
                    },
                    splitLine = {
                        lineStyle: {
                            color: ['#666'],
                            width: 0.5
                        }
                    },
                    nameTextStyle = {
                        fontSize: 16,
                        fontWeight: 'bold'
                    };
                var basicBarOption = {
                        timeline: {
                            data: [],
                            label: {
                                formatter: function (s) {
                                    return s.slice(0, 7);
                                },
                                textStyle: textStyle
                            },
                            controlStyle: {
                                normal: textStyle
                            },
                            playInterval: 1000,
                            currentIndex: 5
                        },
                        options: [
                            {
                                title: {
                                    'text': '2015年10月扫描统计',
                                    'textStyle': textStyle,
                                    'x': 100
                                },
                                tooltip: {'trigger': 'axis'},
                                legend: {
                                    x: 'center',
                                    'data': ['全球', '中国'],
                                    'selected': {
                                        '全球': true,
                                        '中国': true
                                    }, 'textStyle': textStyle
                                },
                                toolbox: {
                                    'show': true,
                                    x: 'right',
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
                                    axisLabel: {
                                        textStyle: textStyle,
                                        'interval': 0
                                    },
                                    splitLine: splitLine,
                                    'type': 'category',
                                    /*                        'name': '     (号)',
                                     'nameTextStyle': nameTextStyle,*/
                                    'data': [
                                        '1号', '\n2号', '3号', '\n4号', '5号', '\n6号', '7号', '\n8号',
                                        '9号', '\n10号', '11号', '\n12号', '13号', '\n14号', '15号', '\n16号',
                                        '17号', '\n18号', '19号', '\n20号', '21号', '\n22号', '23号', '\n24号',
                                        '25号', '\n26号', '27号', '\n28号', '29号', '\n30号', '31号'
                                    ]
                                }],
                                yAxis: [
                                    {
                                        axisLabel: {
                                            textStyle: textStyle
                                        },
                                        splitLine: splitLine,
                                        'type': 'value',
                                        'name': '全球',
                                        'nameTextStyle': nameTextStyle
                                    },
                                    {
                                        axisLabel: {
                                            textStyle: textStyle
                                        },
                                        splitLine: splitLine,
                                        'type': 'value',
                                        'name': '中国',
                                        'nameTextStyle': nameTextStyle
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
                                        'stack': 'global',
                                        'data': []
                                    },
                                    {
                                        'name': '中国', 'yAxisIndex': 1, 'type': 'bar',
                                        'stack': 'china',
                                        'data': []
                                    }
                                ]
                            }
                        ]
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
                            max: Number.MAX_VALUE,
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
                                scaleLimit: {max: 1, min: 1},
                                data: []
                            }
                        ]
                    };
                var genSummaryBar = function (chart) {
                    //console.log('AnalysisOffline.genSummary() ======');
                    // ajax callback
                    var successCallback = function (data) {
                        console.log(data);
                        var dataMap = resp.data.dataMap;
                        var timeline = resp.data.dataTimeline;
                        //设置timeline
                        basicBarOption.timeline.data = timeline;
                        basicBarOption.timeline.currentIndex = timeline.length - 1;
                        //设置options[i].series.data
                        basicBarOption.options[0].title.text = timeline[0].replace('-', '年') + '月扫描统计';
                        basicBarOption.options[0].series[0].data = dataMap['data0Global'][timeline[0]];
                        basicBarOption.options[0].series[1].data = dataMap['data0China'][timeline[0]];
                        for (var i = 1; i < timeline.length; i++) {
                            var option = {
                                title: {text: timeline[i].replace('-', '年') + '月扫描统计'},
                                series: [
                                    {
                                        stack: 'global',
                                        data: dataMap['data0Global'][timeline[i]]
                                    },
                                    {
                                        stack: 'china',
                                        data: dataMap['data0China'][timeline[i]]
                                    }
                                ]
                            };
                            basicBarOption.options.push(option);
                        }
                        chart.setOption(basicBarOption);
                    };
                    var errorCallback = function () {
                        console.log("Ajax error!");
                    };
                    LoadData.post({
                        'url': Constant.ANALYSIS_OFFLINE_N_SUMMARY_RUL + '/' + Constant.ANALYSIS_OFFLINE_N,
                        'success': successCallback,
                        'error': errorCallback
                    });
                };
                var genLatestCharts = function (charts) {
                    // ajax callback
                    var successCallback = function (resp) {
                        //console.log(resp);
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
                                var count = value['doc_count'], name = value['key'];
                                if (max < count) {
                                    max = count;
                                }
                                if (name == '') {
                                    name = '其他'
                                }
                                return {
                                    'value': count,
                                    'name': name
                                }
                            });
                            // (3)生成option={title.text:"xx分布",series[0].data:data}
                            var option;
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
                genSummaryBar(charts.summary.chart);
                genLatestCharts(charts);
                $(window).resize(function () {
                    for (var c in charts) {
                        charts[c]['chart'].resize();
                    }
                });
            }
        )
        ;
    }
};